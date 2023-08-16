import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import { ModeContextProvider } from "./Context/modeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModeContextProvider>
    <Router>
      <App />
    </Router>
  </ModeContextProvider>
);
