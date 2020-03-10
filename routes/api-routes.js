//************************/
// Requiring our models  */
//************************/
var db = require("../models");

module.exports = function(app) {

//************************************************************************/
//  The following route provides the 7 most recent records on the table  */
//************************************************************************/
app.get("/api/workouts/range",(req,res)=>{
  console.log('Providing all workout records for tracking chart creation');
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });

});

  //***********************************************************/
//  The following route returns all of the workout records  */
//***********************************************************/
app.get("/api/workouts/",(req,res)=>{
    console.log('Providing all workout records to find the most recent one');
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//**************************************************************************/
//  The following route creates a new document in the workouts collection  */
//**************************************************************************/
app.post("/api/workouts/",(req,res)=>{
  console.log('Creating new workout data');
  db.Workout.create({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//***************************************************************************/
//  The following route updates workout exercise for a specific workout id  */
//***************************************************************************/
app.put("/api/workouts/:id",(req,res)=>{
  console.log(`Providing data for workout id ${req.params.id}`);
  db.Workout.updateOne({_id: req.params.id},{$push:{exercises:req.body}})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});


};