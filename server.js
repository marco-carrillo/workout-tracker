//*********************************************************/
//  Program dependent on express (to manage routes) and   */
//  mongoose (to manage MongoDB data access).             */
//*********************************************************/
const express = require("express");
const mongoose = require("mongoose");


//************************/
//  Setting up express   */
//************************/
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

//***********************/
// Requiring our routes */
//***********************/
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//*********************************************************/
//  Setting up an environmental variable to check whether */
//  this instance will run locally or in Heroku           */
//*********************************************************/
let PORT = process.env.PORT || 5000;
let uristring=
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/workout";
//************************/
//  Setting up Mongoose  */
//************************/
mongoose.connect(uristring, function (err,res) {
  if(err){
    console.log (`ERROR connecting to ${uristring}.  Error: ${err}`);
  } else {
    console.log(`Succeeded connected to ${uristring}`);
  }
});

//********************************/
//  Listening for assigned port  */
//********************************/
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
