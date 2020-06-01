const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises: [
        {
          type: {
                type: String,
                trim: true,
                required: "Exercise type is Required"
        },
          
          name: {
                type: String,
                trim: true,
                required: "Exercise name is Required"
        },
          
          duration:{
                type: Number,
                required: [true, "Duration is required"]
        },
          weight: {
              type: Number,
              validate: [({ value }) => value >= 0, "Must enter a value greater than 0 for weight."]
        },
          reps: {
            type: Number,
            validate: [({ value }) => value >= 0, "Must enter a value greater than 0 for reps."]
          },  
          sets: {
            type: Number,
            validate: [({ value }) => value >= 0, "Must enter a value greater than 0 for sets."]
          },
          distance: {
            type: Number,
            validate: [({ value }) => value >= 0, "Must enter a value greater than 0 for distance."]
          }
        }
        ]},
        {
          toJSON: {
            virtuals: true
            }
        });
          
WorkoutSchema
    .virtual("totalDuration")
    .get(function () {
          
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
            }, 0);
  });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;