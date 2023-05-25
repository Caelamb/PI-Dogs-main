import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import dogReducer from "../reducer/index";

export const store = createStore(
    dogReducer,
     composeWithDevTools(applyMiddleware(thunk))
    ); 