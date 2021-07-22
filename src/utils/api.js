import data from "../mock_data/cities";

export default (page, pageSize, byValue, byDirection, search) => {
  const items = data.JSON.geonames;

  const searchItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search) ||
      item.adminName1.startsWith(search)
  );
  let sortedItems = searchItems.sort(function (a, b) {
    if (typeof a[byValue] === "string") {
      return a[byValue].localeCompare(b[byValue]);
    } else {
      return a[byValue] - b[byValue];
    }
  });
  if (byDirection === "desc") {
    sortedItems = sortedItems.reverse();
  }

  let pages = Math.ceil(sortedItems.length / pageSize);
  let pageItems = sortedItems.slice(
    page * pageSize - pageSize,
    page * pageSize
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: pageItems, metadata: { pages } }), 10);
  });
};
