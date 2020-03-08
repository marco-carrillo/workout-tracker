// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
module.exports = function(app) {
  //**************************************************************/
  // Client requests some routes, which are in the public path
  //**************************************************************/
  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
  //-------------------------------------------------------------/
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

};
