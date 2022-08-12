class Sorter {
  static sorter(data, orderBy) {
    if (orderBy === "popularity") {
      return {
        key: orderBy,
        data: Array.from(data).sort((a, b) => b.likes - a.likes),
      };
    } else if (orderBy === "title") {
      return {
        key: orderBy,
        data: Array.from(data).sort((a, b) => a.title.localeCompare(b.title)),
      };
    } else if (orderBy === "date") {
      return {
        key: orderBy,
        data: Array.from(data).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
      };
    } else {
      throw "unknown order type";
    }
  }
}
