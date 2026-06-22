import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { renderD3 } from "./d3/d3.js";

const App = () => {

    useEffect(() => {
        const percentWidth = window.innerWidth * 0.8;
        renderD3(percentWidth, 900)
    }, []);

    return React.createElement("h1", null, "Hello");
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(React.createElement(App));