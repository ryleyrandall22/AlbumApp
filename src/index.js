import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import { Login } from "./Components/Login";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/app" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
