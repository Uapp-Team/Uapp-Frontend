import React from "react";

import "./components/core/rippleButton/RippleButton";
import Router from "./Router";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import "./components/core/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { AppProvider } from "./layouts/context/AppContext";

const App = (props) => {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>
    </>
  );
};

export default App;
