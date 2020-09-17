const envOutputOpt = {
  prod: {
    sourcemap: false,
    entryFileNames: "bundle.[hash].js",
  },
  _default: {
    sourcemap: "inline",
    entryFileNames: "bundle.js",
  },
};
export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "iife",
    ...envOutputOpt[process.env.MY_BUILD_ENV || "_default"],
  },
};
