import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { SupportProvider } from "./components/support/SupportContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SupportProvider>
        <App />
      </SupportProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
