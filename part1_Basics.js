//---------------------------------------------------//
// To print the results for any of the 5 .js files run:
// $ node <insert file name>
// in your VS Code terminal
//---------------------------------------------------//

// import redux from "redux"; -- for react
const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  numbOfCakes: 10,
};

// 5 - ACTIONS
// define string constant
const BUY_CAKE = "BUY_CAKE";

// define the action creator
function buyCake() {
  // define our action
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}
// An action is an object with a type property
// An action creator is a function that returns an action.

// 6 - REDUCERS
// (previousState, action) => newState

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        // State object might contain more than one property.
        // Best practice is to create a copy of the state object and then only change the proerties that need to.
        // To make a copy of the state object we use the spread operator:
        ...state,
        numbOfCakes: state.numbOfCakes - 1,
      };
    default:
      return state;
  }
};
// Important to note we are not mutating the state object, we are instead returning a new state object.

// Reducer is a pure function that accepts state and actions as arguments and returns the next state of the application.

// 7 - Store
// Holds application state
// Allows access to state via getState() method
// Allows state to be updated via dispatch() method
// Dispatch method accepts an action as its parameter
// Registers listeners via the subscribe() method
// subscribe method accepts a function as its parameter which is executed any time the state in the store changes.
// Handles unregistering of listeners via the function returned by subscribe(listener)

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

// dispatch method accepts an action as it's parameter
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
