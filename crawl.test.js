const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("normalize url", () => {
  const input = "https://wagslane.dev";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev";

  expect(actual).toEqual(expected);
});

test("normalize url - remove trailing slash", () => {
  const input = "https://wagslane.dev/";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev";

  expect(actual).toEqual(expected);
});

test("normalize url - adding pathname", () => {
  const input = "https://wagslane.dev/path";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";

  expect(actual).toEqual(expected);
});

test("normalize url - remove www", () => {
  const input = "https://www.wagslane.dev";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev";

  expect(actual).toEqual(expected);
});

test("get urls from html", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="https://wagslane.dev">Go to wagslane page</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://wagslane.dev";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://wagslane.dev/"];

  expect(actual).toEqual(expected);
});

test("get urls from html - multiple anchor tags", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="https://wagslane.dev">Go to wagslane page</a>
            <p>This is a paragraph</p>
            <a href="https://github.com/careers">Go to Github</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://wagslane.dev";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://wagslane.dev/", "https://github.com/careers"];

  expect(actual).toEqual(expected);
});

test("get urls from html - invalid URL", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="badurl">This is a bad URL</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://wagslane.dev";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = [];

  expect(actual).toEqual(expected);
});

test("get urls from html - valid URL and invalid URL", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="badurl">This is a bad URL</a>
            <a href="https://wagslane.dev">Go to wagslane page</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://wagslane.dev";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://wagslane.dev/"];

  expect(actual).toEqual(expected);
});

test("get urls from html - relative URLs", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="/blog">Go to blog page</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://wagslane.dev/";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://wagslane.dev/blog"];

  expect(actual).toEqual(expected);
});
