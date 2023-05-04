import { matutu } from "../elements/elements.js";

console.log(matutu.getRelationships().relationships)

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

function positionElementsInCircle(centerX, centerY, radius, elements) {
    var positions = [];
    var numElements = elements.length;
    var angleBetweenElements = 2 * Math.PI / numElements;
  
    for (var i = 0; i < numElements; i++) {
      var element = elements[i];
      var angle = i * angleBetweenElements;
      var x = centerX + radius * Math.cos(angle);
      var y = centerY + radius * Math.sin(angle);
      var xText = x + 5;
      positions.push({name: element.name, id: i, x: x, y: y, xText: xText, yText: y});
    }
  
    return positions;
 }

 function createLines(relations, positions) {
    const relationshipsLines = [];
    
 } 

const positions = positionElementsInCircle(400, 250, 200, matutu.elements)
console.log(positions);

function App() {
    return (
        <React.Fragment>
            <Sitio/>
            <svg width="800" height="500">
                {positions.map(elem => {
                    return (
                        <React.Fragment key={elem.id}>
                            <circle key={elem.id} cx={elem.x} cy={elem.y} r="5" />
                            <text x={elem.xText} y={elem.y} rotate={elem.rotate}>{elem.name}</text>
                            
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