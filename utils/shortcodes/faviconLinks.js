const assetsFaviconsPath = "./src/assets/favicons";
const favicons = [
  {
    rel: "icon",
    name: "favicon-32x32.png",
    sizes: "32x32",
    id: "favicon",
  },
  {
    rel: "apple-touch-icon",
    name: "apple-touch-icon.png",
    sizes: "180x180",
    id: "apple-touch-icon",
  },
];

module.exports = function () {
  return favicons
    .map((favicon) => {
      const type = favicon.type ? "type='" + favicon.type + "'" : "";
      const sizes = favicon.sizes ? "sizes='" + favicon.sizes + "'" : "";
      const id = favicon.id ? "id='" + favicon.id + "'" : "";

      return (
        "<link rel='" +
        favicon.rel +
        "' " +
        id +
        type +
        sizes +
        " href='" +
        assetsFaviconsPath +
        "/light/" +
        favicon.name +
        "'>"
      );
    })
    .flat()
    .join("");
};
