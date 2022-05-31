{
  type: "ADD_TODO";
  todo: {
    id: 0;
    name: "learn Redux";
    complete: false;
  }
}
{
  type: "REMOVE_TODO";
  id: 0;
}

{
  type: "TOGGLE_TODO";
  id: 0;
}

{
  type: "ADD_GOAL";
  goal: {
    id: 0;
    name: "Run a marathon";
  }
}

{
  type: "REMOVE_GOAL";
  id: 0;
}

//pure function
//1 always return the same result if the exact same arguments are passed in
//2 depend only on the arguments passed to them and don't acess values outside of their scope
//3 should never produce any side effects, no ajax request, no DOM interactions etc

//Reducer function
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }
  return state;
}

function createStore(reducer) {
  //the store should have four parts

  //1. the internal state of our entire app "The State"
  let state;
  let listeners = [];

  //2. Get the state (getState)
  const getState = () => state;

  //3. Listen to changes on the state (subscribe)
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  //4 Update the state (dispatch)
  const dispatch = (action) => {
    //call todos(same as reducer) that will get new state
    state = reducer(state, action);
    //loop over all listeners n invoke them
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(todos);
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "learn Redux",
    complete: false,
  },
});
