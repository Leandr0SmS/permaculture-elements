import { matutu } from "../elements/elements.js";

console.log(matutu.getRelationships().relationships)

function Element() {
    return (
        <div className="element">
            <h1>{matutu.name}</h1>
            <p>{matutu.howAmI()}</p>
            <p>My elements are: {matutu.elements.map(elem => `${elem.name} `)}</p>
            
        </div>
    )
}

function App() {
    return (
        <Element/>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)