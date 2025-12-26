module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: "blog",
      output: "../dist/blog"
    }
  };
};
