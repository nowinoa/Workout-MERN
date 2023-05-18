import React, {useEffect, useState} from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            //First we fetch our server
            const response = await fetch('/api/workouts')

            //converts the response data into a JavaScript object
            const json = await response.json();

            //The response.ok condition checks if the HTTP response status is within the range of 200-299 (indicating a successful request)
            if(response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts();
    }, [])

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


