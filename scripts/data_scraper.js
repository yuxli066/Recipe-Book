const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const home_page =
  "https://www.allrecipes.com/recipes/695/world-cuisine/asian/chinese/";
const chrome_path = "/usr/bin/google-chrome";

const waitOptions = {
  waitUntil: "networkidle2",
  timeout: 30000,
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
    // try {
    //     await scroll(page);
    // } catch (e) {
    //     console.log(e)
    // }

    const all_recipes_hrefs = await page.$$eval(
      '[id *= "mntl-taxonomysc-article-list-group"] a',
      (cards) => cards.map((card) => card.href)
    );
    for (let h of all_recipes_hrefs) {
      await page.goto(h, waitOptions);
      console.log("URL:", h);
      const article_heading = String(
        await page.$eval('h1[class *= "article-heading"]', (h1) => h1.innerHTML)
      ).trim();
      const description = String(
        await page.$eval('p[class *= "article-subheading"]', (p) => p.innerHTML)
      ).trim();
      const recipe_ingredients = await page.$$eval(
        '[id *= "mntl-structured-ingredients"] ul li',
        (uls) => uls.reduce((i, li) => i + "|" + li.innerHTML, "")
      );
      const instructions = await page.$$eval(
        '[class *= "recipe__steps"] ol li',
        (ols) => ols.reduce((i, li) => i + "|" + li.innerHTML, "")
      );

      const image_href = String(
        await page.$eval(
          '[class *= "primary-image__media"] img',
          (img) => img.src
        )
      ).trim();
      const image_buffer = await page.evaluate(async (image_href) => {
        return fetch(image_href, {
          method: "GET",
        }).then((r) => r.arrayBuffer());
      }, image_href);

      console.log("IMAGE BUFFER", image_buffer);
      // fs.writeFileSync(`./recipe_images/${article_heading.replace(/\s+/gm,'_')}`, image_buffer)
      const abs_path = path.resolve(
        `./recipe_images/${article_heading.replace(/\s+/gm, "_")}`
      );
      const recipe = {
        image: abs_path,
        recipeName: article_heading,
        description: description,
        ingredients: recipe_ingredients,
        rating: Math.floor(Math.random() * 5) + 1,
        instructions: instructions,
        notes: "",
      };
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
  let browser,
    allScrapedData = {};
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
    await scrape(page);
  } catch (e) {
    console.log(e);
    exit(1);
  } finally {
    await browser.close();
  }
})();
