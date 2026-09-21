import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer } from "../reducers/userReducer.js";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  const rootReducer = combineReducers({
    userReducer: userReducer,
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
  
  });

  return store;
};

const store = configureStore();

export default store;
