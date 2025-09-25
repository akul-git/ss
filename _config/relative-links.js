// _config/relative-links.js
import path from "path";

export default function (eleventyConfig) {
  eleventyConfig.htmlTransformer.addUrlTransform(
    "html",
    function makeUrlRelative(urlInMarkup) {
      // Skip external or special cases
      if (
        !urlInMarkup ||
        !urlInMarkup.startsWith("/") ||
        urlInMarkup.startsWith("/.11ty/") ||
        urlInMarkup.startsWith("//") ||
        urlInMarkup.startsWith("mailto:") ||
        urlInMarkup.startsWith("tel:")
      ) {
        return urlInMarkup;
      }

      // Base directory of current page
      const fromDir = this.url.endsWith("/") ? this.url : path.dirname(this.url);

      // Compute relative path
      let relativePath = path.relative(fromDir, urlInMarkup);

      // Ensure same-directory links start with "./"
      if (!relativePath.startsWith(".")) {
        relativePath = "./" + relativePath;
      }

      // Normalize separators (Windows → forward slashes)
      relativePath = relativePath.split(path.sep).join("/");

      // 🔑 Distinguish between "page-like" URLs and asset files
      const isPageLike =
        urlInMarkup.endsWith("/") || // ends with slash
        !path.extname(urlInMarkup);  // no file extension

      if (isPageLike) {
        // Ensure trailing slash
        if (!relativePath.endsWith("/")) {
          relativePath += "/";
        }
        // Append index.html for file:// compatibility
        relativePath += "index.html";
      }

      return relativePath;
    },
    { priority: -1 }
  );
}
