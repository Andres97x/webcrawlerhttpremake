const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("URL not provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }

  console.log("Start crawling");
  const baseURL = process.argv[2];
  const urls = await crawlPage(baseURL);
  console.log(urls);
}

main();
