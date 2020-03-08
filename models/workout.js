const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    unique: false,
    default: Date.now
  },
  exercises: [
    {
      _id: false,
      type: {type: String},
      name: {type: String},
      duration:  {type: Number},
      weight:  {type: Number},
      reps: {type: Number},
      sets: {type: Number},
      distance: {type: Number}
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
