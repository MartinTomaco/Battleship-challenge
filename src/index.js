import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Component/Game";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { reducer } from "./reducers/index";

const store = createStore(
  reducer, //All the reducers
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
