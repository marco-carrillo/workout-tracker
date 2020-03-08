//*********************************************************/
//  Program dependent on express (to manage routes) and   */
//  mongoose (to manage MongoDB data access).             */
//*********************************************************/
const express = require("express");
const mongoose = require("mongoose");

//************************/
//  Setting up express   */
//************************/
const PORT = process.env.PORT || 3000;
const app = express();
// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

//***********************/
// Requiring our routes */
//***********************/
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//************************/
//  Setting up Mongoose  */
//************************/
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//********************************/
//  Listening for assigned port  */
//********************************/
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
