const { JSDOM } = require("jsdom");

async function crawlPage(baseURL) {
  console.log(`actively crawling page: ${baseURL}`);
  try {
    const res = await fetch(baseURL);

    const resType = res.headers.get("content-type");
    if (!resType.includes("text/html")) {
      // check that response is of type text/html
      console.log(`non-text/html response type, response type: ${resType}`);
      return;
    }

    if (res.status > 399) {
      // check for status code
      console.log(`Bad status code received: ${res.status}`);
      return;
    }

    const htmlBody = await res.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);
    return urls;
  } catch (err) {
    console.log(err.message);
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
