// import redux from "redux"; -- for react
const redux = require("redux");
// import middleware
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
// import apply middleware
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// 5 - ACTIONS
// define string constant
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

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

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// 6 - REDUCERS
// (previousState, action) => newState

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// Reducer is a pure function that accepts state and actions as arguments and returns the next state of the application.

// 7 - Store
// combine reducers before we create our store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// pass applymiddleware as an argument to createStore
// pass in the middleware to the applyMiddleware method
// FYI, you can add more than one middleware as a param
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

// dispatch method accepts an action as it's parameter
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
