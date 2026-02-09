const { normalizeURL } = require("./crawl.js");

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
