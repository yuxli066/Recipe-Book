const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const home_page =
  "https://www.allrecipes.com/recipes/695/world-cuisine/asian/chinese/";
const chrome_path = "/usr/bin/google-chrome";

const waitOptions = {
  waitUntil: ["load", "domcontentloaded", "networkidle2"],
  timeout: 60000,
};

const nav_to_page = async (url, page) => {
  try {
    await page.goto(url, waitOptions);
    return page.evaluate(() => document.title);
  } catch (err) {
    console.error(err.message);
    return false;
  }
};
const scrape = async (page) => {
  const all_recipes = [];

  try {
    const all_recipes_hrefs = await page.$$eval(
      '[id *= "mntl-taxonomysc-article-list-group"] a',
      (cards) => cards.map((card) => card.href)
    );
    for (let h of all_recipes_hrefs) {
      let page_nav_successful = false,
        tries = 0;

      while (!page_nav_successful) {
        const doc_title = await nav_to_page(h, page);
        if (doc_title) {
          break;
        } else if (tries > 5) {
          throw new Error("page nav failed.");
        }
        tries += 1;
      }

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
                  /(?:\n|DOTDASH MEREDITH VIDEO STUDIOS)+/gm,
                  ""
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
                  /(?:\n|DOTDASH MEREDITH VIDEO STUDIOS)+/gm,
                  ""
                ),
              ""
            )
        );
      }

      const large_image_exists = await page.$(
        '[class *= "primary-image__media"] img'
      );
      const small_image_exists = await page.$(
        'img[class *= "universal-image__image"]'
      );
      const image_exists = large_image_exists || small_image_exists;
      if (image_exists) {
        const image_selector = large_image_exists
          ? '[class *= "primary-image__media"] img'
          : 'img[class *= "universal-image__image"]';
        const image_href = String(
          await page.$eval(image_selector, (img) => img.src)
        ).trim();
        const image_res = await page.goto(image_href, waitOptions);
        const imageBuffer = await image_res.buffer();
        const image_name = image_href.split("/")[
          image_href.split("/").length - 1
        ];
        image_file_path = path.resolve(
          __dirname,
          "recipe_images",
          `${String(article_heading)
            .replace(/\s+/gm, "_")
            .toLowerCase()}.${String(
            image_name.split(".")[image_name.split(".").length - 1]
          ).replace("&w=160&q=60&c=sc&poi=auto&orient=true&h=90", "")}`
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
    fs.writeFileSync(
      "./scripts/scraped_recipes_no_media.json",
      JSON.stringify(all_recipes)
    );
  } catch (e) {
    console.log(e);
    exit(1);
  } finally {
    await browser.close();
  }
})();
