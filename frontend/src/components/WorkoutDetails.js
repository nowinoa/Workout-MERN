import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// npm i fate-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
          }) 
        //the workout we are deleting
        const json = await response.json();

        if(response.ok) {
            //update the global state deleting the workout
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    }
    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (Kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            {/* Formating the date */}
            {/* ex. two days (from now) + sufix: ago = two days ago */}
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}</p>
            {/* using material icons cdn */}
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    );
};


export default WorkoutDetails;
