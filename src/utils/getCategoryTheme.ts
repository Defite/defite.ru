/**
 * Gets tailwind class depending on tag
 * @returns string
 * @param tag
 */
const getCategoryTheme = (category: string) => {
  switch (category) {
    case "Blog":
      return "bg-lime-500";

    case "JS":
      return "bg-tag-js";

    default:
      break;
  }
};

export default getCategoryTheme;
