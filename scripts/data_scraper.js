const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const { rejects } = require("assert");
const { url } = require("inspector");

const home_page =
  "https://www.allrecipes.com/recipes/695/world-cuisine/asian/chinese/";
const chrome_path = "/usr/bin/google-chrome";

const waitOptions = {
  waitUntil: "networkidle2",
  timeout: 60000,
};

// const scroll = async (page) => {
//     await page.evaluateHandle(() => {
//         const travel_distance = window.innerHeight;
//         let max_distance = document.body.scrollHeight, current_distance = 0;
//         console.log(travel_distance, max_distance);
//         let count = 0, max_count = 150;
//         return new Promise((resolve, reject) => {
//             try {
//                 const timer = setInterval(() => {
//                     window.scrollBy({
//                         top: travel_distance,
//                         left: 0,
//                         behavior: 'smooth'
//                     });
//                     current_distance += travel_distance;
//                     max_distance += document.body.scrollHeight;
//                     if (current_distance >= max_distance) {
//                         clearInterval(timer);
//                         resolve();
//                     }

//                     if (count >= max_count) {
//                         clearInterval(timer);
//                         resolve();
//                     }

//                     ++count;

//                 }, 500);
//             } catch (e) {
//                 reject(e);
//             }
//         });
//     });
// }

const scrape = async (page) => {
  const all_recipes = [];
  try {
    const all_recipes_hrefs = await page.$$eval(
      '[id *= "mntl-taxonomysc-article-list-group"] a',
      (cards) => cards.map((card) => card.href)
    );
    for (let h of all_recipes_hrefs) {
      await page.goto(h, waitOptions);

      console.log("page url:", h);
      let article_heading = null;
      let description = null;
      let recipe_ingredients = null;
      let instructions = null;
      let image_file_path = null;

      const heading_exists = page.$('h1[class *= "article-heading"]');
      if (heading_exists) {
        article_heading = String(
          await page.$eval(
            'h1[class *= "article-heading"]',
            (h1) => h1.innerHTML
          )
        ).trim();
      }

      const description_exists = await page.$(
        'p[class *= "article-subheading"]'
      );
      if (description_exists) {
        description = String(
          await page.$eval(
            'p[class *= "article-subheading"]',
            (p) => p.innerHTML
          )
        ).trim();
      }

      const recipe_ingredients_exists = await page.$(
        '[id *= "mntl-structured-ingredients"] ul li'
      );
      if (recipe_ingredients_exists) {
        recipe_ingredients = await page.$$eval(
          '[id *= "mntl-structured-ingredients"] ul li',
          (uls) =>
            uls.reduce(
              (i, li) =>
                i +
                "|" +
                String(li.innerText).replace(
                  /[\n|DOTDASH MEREDITH VIDEO STUDIOS]+/gm,
                  " "
                ),
              ""
            )
        );
      }

      const instructions_exist = await page.$(
        '[class *= "recipe__steps"] ol li'
      );
      if (instructions_exist) {
        instructions = await page.$$eval(
          '[class *= "recipe__steps"] ol li',
          (ols) =>
            ols.reduce(
              (i, li) =>
                i +
                "|" +
                String(li.innerText).replace(
                  /[\n|DOTDASH MEREDITH VIDEO STUDIOS]+/gm,
                  " "
                ),
              ""
            )
        );
      }

      const image_exists = await page.$(
        '[class *= "primary-image__media"] img'
      );
      if (image_exists) {
        const image_href = String(
          await page.$eval(
            '[class *= "primary-image__media"] img',
            (img) => img.src
          )
        ).trim();
        const image_res = await page.goto(image_href, waitOptions);
        const imageBuffer = await image_res.buffer();
        const image_name = image_href.split("/")[
          image_href.split("/").length - 1
        ];
        image_file_path = path.resolve(
          __dirname,
          "recipe_images",
          `${String(article_heading).replace(/\s+/gm, "_").toLowerCase()}.${
            image_name.split(".")[image_name.split(".").length - 1]
          }`
        );
        fs.writeFileSync(image_file_path, imageBuffer, "base64");
      }

      const recipe = {
        image: image_file_path,
        recipeName: article_heading,
        description: description,
        ingredients: recipe_ingredients,
        rating: Math.floor(Math.random() * 5) + 1,
        instructions: instructions,
        notes: description,
      };
      console.log("RECIPE", recipe);
      all_recipes.push(recipe);
    }
    console.log(all_recipes);
  } catch (e) {
    console.log(e);
  } finally {
    return all_recipes;
  }
};

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      devtools: false,
      userDataDir: "./user_data_scraper",
      ignoreDefaultArgs: ["--enable-automation"],
      ignoreHTTPSErrors: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--start-maximized",
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1912,
      height: 1085,
      deviceScaleFactor: 1,
    });
    await page.goto(home_page, waitOptions);
    const all_recipes = await scrape(page);
    fs.writeFileSync("./scraped_recipes.json", JSON.stringify(all_recipes));
  } catch (e) {
    console.log(e);
    exit(1);
  } finally {
    await browser.close();
  }
})();
