const { sortPages } = require("./report.js");

test("sort pages", () => {
  const input = { "https://wagslane.dev/blog": 5, "https://wagslane.dev": 10 };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 10],
    ["https://wagslane.dev/blog", 5],
  ];
  expect(actual).toEqual(expected);
});
