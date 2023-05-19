import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps};

        const response = await fetch('/api/workouts', {
            method: 'POST',
            //the JavaScript object workout is converted into a JSON string before being sent to the server.
            body: JSON.stringify(workout),
            //By setting it to application/json, the server knows that the request body contains JSON data and can appropriately handle and parse it.
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //responsible for parsing the response body as JSON data 
        //By using await before response.json(), the code waits for the JSON parsing to complete before assigning the result to the json variable. 
        const json = await response.json();

        if(!response.ok) {
            setError(json.error)
        } 
        if(response.ok) {
            //cleaning the input fields and variables associated with them.
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
            //When the response is 200 we update the global state by passing to it the new workout object
            //Also by sending the new one to the database, the json object on home page (inside the useEffect) will change
            //That meas the compoent will automatically re-render and the screen will be updated with the new workout
            dispatch({type: ' CREATE_WORKOUT', payload: json});
        }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        //sets the value of the input field to the value stored in the load variable. 
        value={title}
      />

      <label>Load (kg):</label>
      <input type="number" 
             onChange={(e) => setLoad(e.target.value)}
             value={load} 
       />

      <label>Reps:</label>
      <input type="number" 
             onChange={(e) => setReps(e.target.value)}
             value={reps} 
       />

    <button>Add Workout</button>
    {error && <div className="error">{error}</div>}

    </form>
  );
};

export default WorkoutForm;
