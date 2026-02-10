const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages = {}) {
  // for recursion
  // base condition -> if (the URL we are crawling has already been crawled) && if (we are crawling an external URL)
  // recursive -> basically we are going to recusively crawl these pages until all of the link fall in one of these conditions.

  const baseURLHostname = new URL(baseURL).hostname;
  const currentURLHostname = new URL(currentURL).hostname;
  if (currentURLHostname !== baseURLHostname) {
    // check if URL is external
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    // check if URL has already been crawled
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  try {
    console.log(`actively crawling page: ${currentURL}`);
    const res = await fetch(currentURL);

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      // check that response is of type text/html
      console.log(`non-text/html response type, response type: ${contentType}`);
      return pages;
    }

    if (res.status > 399) {
      // check for bad status code
      console.log(
        `Bad status code received: ${res.status}, on page ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await res.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);

    // recursively crawlPage()
    for (const nextUrl of urls) {
      await crawlPage(baseURL, nextUrl, pages);
    }

    return pages;
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page ${currentURL}`);
  }
}

function normalizeURL(urlString) {
  try {
    const urlObj = new URL(urlString);
    const { hostname, pathname } = urlObj;
    const normalizedHostname = hostname.startsWith("www.")
      ? hostname.slice(4)
      : hostname;
    const normalizedPathname = pathname === "/" ? "" : pathname;

    const normalizedURL = `${normalizedHostname}${normalizedPathname}`;
    return normalizedURL;
  } catch (err) {
    console.log(`Couldn't normalize URL: ${err.message}`);
  }
}

function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const anchorElements = document.querySelectorAll("a");
  const urls = [];
  for (const a of anchorElements) {
    try {
      const url = a.href;
      if (url.startsWith("/")) {
        // relative URL
        const urlObj = new URL(url, baseURL);
        urls.push(urlObj.href);
      } else {
        // relative URL
        const urlObj = new URL(url);
        urls.push(urlObj.href);
      }
    } catch (err) {
      console.log(`Couldn't save invalid URL: ${err.message}`);
    }
  }

  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
