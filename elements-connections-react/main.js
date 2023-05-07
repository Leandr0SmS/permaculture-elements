import { matutu } from "../elements/elements.js";

const HandlePreventDefault = (e) => e.preventDefault();

function  FormSitioInput (props) {
    return (
        <div id="card-one" className="card">
          <form onSubmit={HandlePreventDefault}>
              <label className="form-label">What's the name of your system?</label>
              <input className="text-input" id="system-name" type="text" name="sitio-name" size="40" required/>
              <div className="div-btn">
                <button className="next card-btn" id="next-div-one">
                  Next 
                  <img src="../images/arrow-right.svg"/>
                </button>
              </div>
          </form> 
        </div>
    )
}

function FormElement(props) {
    return (
        <div id="card-two" className="card">
            <form onSubmit={HandlePreventDefault}>
                <h2 className="card-heading">Let's add elements!</h2>
                <label className="form-label">Whats the name of the element?</label>
                <input className="text-input" id="element-name" type="text" name="sitio-name" size="40" required/>
                <label className="form-label">What does your element need (inputs)?</label>
                <input className="text-input" id="system-inputs" type="text" name="system-inputs" size="40" required/>
                <label className="form-label">What does your element provide (outputs)?</label>
                <input className="text-input" id="system-outputs" type="text" name="system-outputs" size="40" required/>
                <label className="form-label">What are the intrinsic characteristics of this element?</label>
                <input className="text-input" id="intrinsic-characteristics" type="text" name="intrinsic-characteristics" size="40" required/>
                <div className="div-btn">
                    <button className="prev card-btn">
                        <i className="fa-solid fa-circle-arrow-left"></i>
                        Preview
                    </button>
                    <button className="next card-btn" id="next-div-two">
                        Next 
                        <i className="fa-solid fa-circle-arrow-right"></i>
                    </button>
                </div>
            </form> 
        </div>
    )
}

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
      if (x < centerX && y <= centerY) {
          point[0] = x - 50;
          point[1] = y - 5;
      }
      if (x >= centerX && y < centerY) {
        point[0] = x + 5;
        point[1] = y - 5;
    }
    if (x >= centerX && y >= centerY) {
        point[0] = x + 5;
        point[1] = y + 15;
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
                        <div key={i} className="box-item">
                            <div className="flip-box">
                                <div className="flip-box-front text-center">
                                    <div className="inner color-white">
                                        <h1>{elem.name}</h1>
                                    </div>
                                </div>
                                <div className="flip-box-back text-center">
                                    <div className="inner color-white">
                                        <p>Inputs: {elem.inputs.join(" / ")}</p>
                                        <p>Outputs: {elem.outputs.join(" / ")}</p>
                                    </div>
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
            {/*<ElementCard width={w} height={h} />
            <InputsCards/>*/}
            <FormElement/>
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)