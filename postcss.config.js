module.exports = {
  plugins: [
    require("autoprefixer")({
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
