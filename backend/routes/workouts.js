const express = require("express");
//! All the functionality is on the workoutController so the router is cleaner
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

// ? Using Express Router
// * First we need to create the router element
const router = express.Router();

// * Then we need to configure all the routes that the router will have
//GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a new workout
router.delete("/:id", deleteWorkout);

//UPDATE a new workout
router.patch("/:id", updateWorkout);

// * Fianly we export the router to use it on the server.js
module.exports = router;
