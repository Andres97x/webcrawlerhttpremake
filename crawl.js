function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const { hostname, pathname } = urlObj;
  const normalizedHostname = hostname.startsWith("www.")
    ? hostname.slice(4)
    : hostname;
  const normalizedPathname = pathname === "/" ? "" : pathname;

  const normalizedURL = `${normalizedHostname}${normalizedPathname}`;
  return normalizedURL;
}

module.exports = {
  normalizeURL,
};
