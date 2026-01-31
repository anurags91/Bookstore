import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toaster
          position="center-top"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              fontWeight: "500",
              marginTop: "100px",
            },
          }}
        />
      </Provider>
    </Router>
  </StrictMode>,
);
