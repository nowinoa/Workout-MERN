//This document will be use to manage all the database connections
//Getting the model
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // * find => brings all the existing data from db
    //We need to pass it an object bc we are retriving a object with different workouts
    //To filter you can pass some data within the object: const workouts = await Workouts.find({ reps: 20}) 
    // Will only bring the workouts with a property of 20 reps
    // * Sort({createdAt: -1}) sort the object by newest workout. 
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
//* Ectracts the id from the request params
// ! If the id isn't correct we will get an error and the code will break that is why we need to prevent it by checking if 
// ! the id is valid
  const { id } = req.params

// * The code snippet checks if the id is a valid MongoDB ObjectId. 
// * 24-character hexadecimal string that should consist of alphanumeric characters (0-9, a-f, A-F).

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

// * Find an element by id on the db
  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  // add to the database
  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
    }
    // * To refer to the id on database we use _id
    const workout = await Workout.findOneAndDelete({_id: id});
    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
    }
    //The first parámeter is going to be the property we will use to find the workout
    //The second parámeter is the updates we will be making on that object
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        //Instead of passing the values staight away to update them once
        //We will be spreading the properties sent on the request body so each request has new values
        ...req.body
        //This will look like {title: 'Maria', reps: 8}
    });
    if(!workout) {
        return res.status(400).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout 
}