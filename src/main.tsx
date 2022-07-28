import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </BrowserRouter>
);
