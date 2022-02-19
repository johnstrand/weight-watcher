import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextRoot } from "./contexts/ContextRoot";

ReactDOM.render(
  <React.StrictMode>
    <ContextRoot>
      <App />
    </ContextRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
