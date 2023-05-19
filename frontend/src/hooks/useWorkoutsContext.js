import { WorkoutContext } from '../context/context';
import { useContext } from 'react';

//Everytime we want to use the context we will invoque this function
export const useWorkoutsContext = () => {
    //This context has two properties (the context value) state and dispatch
    const context = useContext(WorkoutContext);

    //When a component is out of the context.provider, the context will be null and break our code.
    //It is a better option to trhow an error
    if(!context) {
        throw Error('useWorkoutContext must be inside the context provider')
    }
    return context
}
