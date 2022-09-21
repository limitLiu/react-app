import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./assets/scss/app.scss";

createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
