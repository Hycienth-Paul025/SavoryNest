module.exports = {
  plugins: [
    require("autoprefixer"),
    require('cssnano')({
      overrideBrowserslist: [
        "> 0.5%",
        "last 2 versions",
        "Firefox ESR",
        "iOS >= 10",
        "Safari >= 11",
        "Edge >= 16 ",
      ],
      grid: true, // adds IE grid prefixes
    }), 
  ],
}; 
