function printReport(pages) {
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to page: ${page[0]}`);
  }
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  const pagesSortedByHits = pagesArr.sort((a, b) => b[1] - a[1]);
  return pagesSortedByHits;
}

module.exports = {
  sortPages,
  printReport,
};
