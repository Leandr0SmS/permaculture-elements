import { matutu } from "../elements/elements.js";

//console.log(matutu.getRelationships().relationships)

function Sitio() {
    return (
        <div className="element">
            <h1>{matutu.name}</h1>
            <p>{matutu.howAmI()}</p>
            <p>My elements are: {matutu.elements.map(elem => `${elem.name} `)}</p>
            {/*<div>
                <h3>I have this connections: </h3>
                {matutu.getRelationships().relationships.map(
                                                relation => {
                                                    console.log(matutu.getRelationships().relationships.indexOf(relation))
                                                    return  (
                                                        <p>{relation.elementOutput.name} give {relation.output} to {relation.elementInput.name}</p>
                                                    )
                                                })}
            </div>*/}
        </div>
    )
}

function positionElementsInCircle(centerX, centerY, radius, numElements) {
    var positions = [];
    var angleBetweenElements = 2 * Math.PI / numElements;
  
    for (var i = 0; i < numElements; i++) {
      var angle = i * angleBetweenElements;
      var x = centerX + radius * Math.cos(angle);
      var y = centerY + radius * Math.sin(angle);
      positions.push({id: i, x: x, y: y});
    }
  
    return positions;
}

console.log(positionElementsInCircle(400, 250, 100, 4));
const positions = positionElementsInCircle(400, 250, 100, 4)

function App() {
    return (
        <React.Fragment>
            <Sitio/>
            <svg width="800" height="500">
                {positions.map(elem => <circle key={elem.id} cx={elem.x} cy={elem.y} r="2"/>)}
            </svg>
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)