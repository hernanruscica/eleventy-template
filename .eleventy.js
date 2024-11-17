import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyconfig) {

    eleventyconfig.addPassthroughCopy("./src/assets/styles");
    eleventyconfig.addPassthroughCopy("./src/assets/images");
    eleventyconfig.addPassthroughCopy("./src/assets/icons");
    eleventyconfig.addPassthroughCopy("./src/assets/scripts");
    eleventyconfig.addPassthroughCopy("./src/assets/fonts");
    
    eleventyconfig.addWatchTarget("./src/assets/styles");
    eleventyconfig.addWatchTarget("./src/assets/fonts");

    eleventyconfig.addPlugin(EleventyHtmlBasePlugin); 

    return {
        dir: {
            input: "src",
            output: "public"
        },
    };
};