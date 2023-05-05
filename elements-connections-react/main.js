import { matutu } from "../elements/elements.js";

const w = 450, h = 300, r = w > h ? w/4 : h/4, cx=(w/2), cy=(h/2);

const elements = matutu.elements;

matutu.positionElementsInCircle((w/2), (h/2), r, matutu.elements);

const linesData = matutu.getRelationships().relationshipsLines;

const dotsPosition = elements.map(elem => elem.circlePosition);

function calculateTextPositions(centerX, centerY, radius, points) {

    const angles = points.map(point => {
      const dx = point[0] - centerX;
      const dy = point[1] - centerY;
      return Math.atan2(dy, dx);
    });
  
    const textPositions = angles.map((angle, i) => {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return [x + (x - centerX) * 0.05, y + (y - centerY) * 0.05];
    });
    
    return textPositions
  }

function textCorrection (centerX, centerY, points) {
  const correction = points.map(point => {
      let x = point[0];
      let y = point[1];
      if (x < centerX && y > centerY) {
          point[0] = x - 35;
          point[1] = y + 15;
      }
      if (x < centerX && y < centerY) {
          point[0] = x - 25;
          point[1] = y - 5;
      }
      if (x >= centerX && y < centerY) {
        point[0] = x + 5;
        point[1] = y - 5;
    }
    if (x >= centerX && y >= centerY) {
        point[0] = x + 5;
        point[1] = y + 5;
    }
      return point;
  })
  return correction;
}

// Call the function to get the text positions
const textPositions = textCorrection(cx, cy, calculateTextPositions(cx, cy, r, dotsPosition));

function Sitio() {
    return (
        <div className="element--title--info">
            <h1>{matutu.name}</h1>
            <p><span>Inputs:</span> {matutu.inputs.join(" / ")}</p>
            <p><span>Outputs:</span> {matutu.outputs.join(" / ")}</p>
            {/*<div className="elements--list">
                <h3>Elements: </h3>
                <ul>
                    {elements.map((elem, i) => <li key={i}>{elem.name}</li>)}
                </ul>
            </div>*/}
        </div>
    )
}

function Lines(props) {
    return (
        <React.Fragment>
            {textPositions.map((elem, i) =>  <text fill="" key={i} x={elem[0]} y={elem[1]}>{elements[i].name}</text>)}
        </React.Fragment>
    )
}

function Text() {
    return (
        <React.Fragment>
            {linesData.map((elem, i) =>  <line key={i} x1={elem.positionX1Y1[0]} y1={elem.positionX1Y1[1]} x2={elem.positionX2Y2[0]} y2={elem.positionX2Y2[1]} stroke="black" />)}
        </React.Fragment>
    )
}

function ElementsNetwork(props) {
    return (
        <svg width={props.width} height={props.height} className="svg">
            {elements.map((elem, i) => {
                return (
                    <React.Fragment key={i}>
                        <circle key={i} cx={elem.circlePosition[0]} cy={elem.circlePosition[1]} r="5" />
                        {/*<text x={elem.circlePosition[0] + 5} y={elem.circlePosition[1]} >{elem.name}</text>*/}
                        <Lines/>
                        <Text/>
                    </React.Fragment>    
                )
            })}
        </svg>
    )
}

function InputsCards () {
    return (
        <div className="elements--cards">
                {elements.map((elem, i) => {
                    return (
                        <div key={i} className="card">
                            <div className="face face1">
                                <div className="content">
                                    <h1>{elem.name}</h1>
                                </div>
                            </div>
                            <div className="face face2">
                                <div className="content">
                                    <p>Inputs: {elem.inputs.join(" / ")}</p>
                                    <p>Outputs: {elem.outputs.join(" / ")}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}

function ElementCard(props) {
    return (
        <div className="element">
            <Sitio/>
            <ElementsNetwork width={props.width} height={props.height}/>
        </div>
    )
}

function App() {
    return (
        <React.Fragment>
            <ElementCard width={w} height={h} />
            <InputsCards/>
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)