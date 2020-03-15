//************************/
// Requiring our models  */
//************************/
var db = require("../models");

module.exports = function(app) {

//************************************************************************/
//  The following route provides the 7 most recent records on the table  */
//  This data will be used by the graph.  The graph will aggregate all   */
//  of the exercises inside each workout and will graph them accordingly */
//  However, the workout needs to have at least one exercise to count    */
//  Workouts without data will be ignored.                               */
//************************************************************************/
app.get("/api/workouts/range",(req,res)=>{
  console.log('Providing latest 7 records of workouts - Based on date');
  db.Workout.find({"exercises.0":{"$exists": true}}).sort({_id:-1}).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//*************************************************************************/
//  The following route returns most recent workout records.  The client  */
//  is trying to figure out which one is the most recent one              */
//*************************************************************************/
app.get("/api/workouts/",(req,res)=>{
    console.log('Providing most recent workout record');
    db.Workout.find().sort({_id:-1}).limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//**************************************************************************/
//  The following route creates a new document in the workouts collection  */
//  At this point, the exercises array will be empty.                      */
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
//  It will push a new exercise into the embedded exercises array           */
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