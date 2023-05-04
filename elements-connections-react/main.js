import { matutu } from "../elements/elements.js";

console.log(matutu.elements)
const elements = matutu.elements;

function Sitio() {
    return (
        <div className="element">
            <h1>{matutu.name}</h1>
            <p>{matutu.howAmI()}</p>
            <div>
                <h3>My elements are: </h3>
                <ul>
                    {elements.map(elem => <li key={elem.name}>{elem.name}</li>)}
                </ul>
            </div>
        </div>
    )
}

 function createLines(relations, positions) {
    const relationshipsLines = [];

 } 

matutu.positionElementsInCircle(400, 250, 200, matutu.elements);

function App() {
    return (
        <React.Fragment>
            <Sitio/>
            <svg width="800" height="500">
                {elements.map(elem => {
                    return (
                        <React.Fragment key={elem.name}>
                            <circle key={elem.name} cx={elem.circlePosition[0]} cy={elem.circlePosition[1]} r="5" />
                            <text x={elem.circlePosition[0] + 5} y={elem.circlePosition[1]} >{elem.name}</text>
                        </React.Fragment>    
                    )
                })}
            </svg>
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)