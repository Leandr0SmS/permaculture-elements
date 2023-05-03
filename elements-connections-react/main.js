import { matutu } from "../elements/elements.js";

console.log(matutu)

function App() {
    return (
        <h1>{matutu.howAmI()}</h1>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)