import pluginNavigation from "@11ty/eleventy-navigation";

const globs = { jobs: "jobs/**/*.md", posts: "posts/**/*.md" };

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addWatchTarget("css");

  // Collections
  eleventyConfig.addCollection("jobs", function (collection) {
    return collection
      .getFilteredByGlob(globs.jobs)
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("posts", function (collection) {
    return collection
      .getFilteredByGlob(globs.posts)
      .sort((a, b) => b.date - a.date);
  });

  // Filters
  eleventyConfig.addFilter("date", function (iso) {
    const date = new Date(iso);
    const YYYY = date.getFullYear();
    const MM = (date.getMonth() + 1).toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    return `${MM}/${YYYY}`;
  });

  // Shortcodes
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });
}
