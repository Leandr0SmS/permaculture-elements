const { createRoot } = ReactDOM;
const { useEffect } = React;
import { renderD3 } from "./d3/d3.js";

const App = () => {

    useEffect(() => {
        const percentWidth = window.innerWidth * 0.8;
        renderD3(percentWidth, 900)
    }, []);

    return (
        <h1>Hello</h1>
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);