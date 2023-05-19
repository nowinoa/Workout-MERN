//* In this component we are going to define a context to make a global state (useReducer) available for every componponent.
//* On this context we are going to export the global state and the dispatch method (to update the state based on the action type)
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

//The workoutReducer function is responsible for handling state updates based on different actions types.
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        //This means we will be adding the new created workout (single object) to the array of workouts we will already have on the state
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        //for each object of the array (state), check that the id is not the same as the action id
        //action.payload._id = el id del elemento que queremos eliminar
        //dispatch({type: 'DELETE_WORKOUT', payload: json})
        //json = {title, _id, reps, loads, updatedAt, createdAt}
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state;
  }
};

// * For using the useReducer  => dispatch({type: 'SET_WORKOUT', payload: [{},{}]}) // payload will be a collection of workouts (the data that is used on the action)

// ? Creating a provider to export it and use it somewhere else as a component
export const WorkoutContextProvider = ({ children }) => {
  //! children : anything wrapped inside this component --> index.js
  // <WorkoutContextProvider>
  //   <App />
  // </WorkoutContextProvider>

  // ? USE REDUCER
  //The useReducer hook takes two arguments: the workoutReducer function and the initial state object.
  // state is where the current state value is stored.
  // dispatch is a function that you can call to send an action to the reducer, triggering a state update.
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });
  
  return (
    // * Wraping all the elements that need to have access to the context
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
