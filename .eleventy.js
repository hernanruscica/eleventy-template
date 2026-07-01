import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
//const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");



export default async function (eleventyconfig) {
//module.exports = function (eleventyconfig) {

    eleventyconfig.addPassthroughCopy("./src/assets/styles");
    eleventyconfig.addPassthroughCopy("./src/assets/images");
    eleventyconfig.addPassthroughCopy("./src/assets/icons");
    eleventyconfig.addPassthroughCopy("./src/assets/scripts");
    eleventyconfig.addPassthroughCopy("./src/assets/fonts");
    eleventyconfig.addPassthroughCopy("./src/lib");
    eleventyconfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });
    eleventyconfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
    
    eleventyconfig.addWatchTarget("./src/assets/styles");
    eleventyconfig.addWatchTarget("./src/assets/fonts");

    eleventyconfig.addCollection("blog", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/posts/*.md");
    });

    eleventyconfig.addFilter("json", function (value) {
        return JSON.stringify(value);
    });

    eleventyconfig.addFilter("date", function (date, format) {
        if (format === 'U') {
            return Math.floor(date.getTime() / 1000);
        }
        // Add other date formats here if needed
        return date;
    });

    eleventyconfig.addPlugin(EleventyHtmlBasePlugin); 

    return {
        dir: {
            input: "src",
            output: "public"
        },
    };
};
