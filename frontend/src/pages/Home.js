import React, {useEffect, useState} from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
    //We import the useContext() which has two properties we can destructure: workouts (state.workouts, ...state - bc it only has one property)
    //and dispatch (how we update the state)
    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            //First we fetch our server
            const response = await fetch('/api/workouts')

            //converts the response data into a JavaScript object
            const json = await response.json();

            //The response.ok condition checks if the HTTP response status is within the range of 200-299 (indicating a successful request)
            if(response.ok) {
                //This will workouts: action.payload => sets the workouts (state.workouts) to the response we get from the database when fetching with get all method.
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts();
    }, [workouts])

    return (
        <div className='home'>
            <div className='workouts'>
             {/*The && operator checks if the workouts variable is truthy, and if so runs the following function*/}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;


