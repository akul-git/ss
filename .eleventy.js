import relativeLinks from "./_config/relative-links.js";
export default function (eleventyConfig) {
eleventyConfig.addPlugin(relativeLinks);

eleventyConfig.addGlobalData("eleventyComputed", {
  permalink: data => {
    if (data.page.filePathStem === "/index") return "/";
    return `${data.page.filePathStem}/index.html`;
  }
});

eleventyConfig.addPassthroughCopy({ 
  "src/styles/styles.css": "assets/css/styles.css",
  "src/css/slides.css": "assets/css/slides.css",
  "src/css/testimonials.css": "assets/css/testimonials.css",
  "src/fa": "assets/fa",
  "src/images": "assets/images",
  "src/js": "assets/js"
});

  return {
 pathPrefix: "",
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes"
    }
  };
};