import type { CollectionEntry } from "astro:content";

/**
 * Gets tailwind class depending on tag
 * @returns string
 * @param tag
 */
const getCategoryTheme = (
  category: CollectionEntry<"blog">["data"]["category"],
) => {
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
