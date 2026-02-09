const { JSDOM } = require("jsdom");

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
};
