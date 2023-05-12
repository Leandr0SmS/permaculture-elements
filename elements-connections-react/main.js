import { matutu } from "../elements/elements.js";
import {Element} from "../elements/class.js";

const HandlePreventDefault = (e) => e.preventDefault();

function  FormSitio ({
                        system_name_value, 
                        handleSitioFormChange, 
                        sitio_inputs_value, 
                        sitio_outputs_value, 
                        onclick
                    }) {
    return (
        <div className="card">
          <form className="form" onSubmit={HandlePreventDefault}>
              <label className="form-label" htmlFor="system_name">What's the name of your system?</label>
              <input className="text-input" name="system_name" value={system_name_value} onChange={handleSitioFormChange} type="text" size="40" required/>
              <label className="form-label" htmlFor="sitio_inputs">What does your element need (inputs)?</label>
              <input className="text-input" type="text" name="sitio_inputs" value={sitio_inputs_value} onChange={handleSitioFormChange} size="40" required/>
              <label className="form-label" htmlFor="sitio_outputs">What does your element provide (outputs)?</label>
              <input className="text-input" type="text" name="sitio_outputs" value={sitio_outputs_value} onChange={handleSitioFormChange} size="40" required/>
              <div className="div-btn">
                <button className="form-btn" name="formSitio" value="formElement" type="button" onClick={onclick}>
                  NEXT
                  <img className="btn-icon" src="../images/arrow-right.svg" alt="arrow icon to the rigth"/>
                </button>
              </div>
          </form> 
        </div>
    )
}

function FormElement({
                        element_name_value, 
                        element_inputs_value, 
                        element_Outputs_value, 
                        element_intrinsic_characteristics_value, 
                        onchange, 
                        onPrevClick, 
                        onAddClick, 
                        onConnectClick
                    }) {
    return (
        <div className="card">
            <form className="form" onSubmit={HandlePreventDefault}>
                <h2 className="card-heading">Let's add elements!</h2>
                <label className="form-label" htmlFor="element_name">Whats the name of the element?</label>
                <input className="text-input" type="text" name="element_name" value={element_name_value} onChange={onchange} size="40" required/>
                <label className="form-label" htmlFor="element_inputs">What does your element need (inputs)?</label>
                <input className="text-input" type="text" name="element_inputs" value={element_inputs_value} onChange={onchange} size="40" required/>
                <label className="form-label" htmlFor="element_outputs">What does your element provide (outputs)?</label>
                <input className="text-input" type="text" name="element_outputs" value={element_Outputs_value} onChange={onchange} size="40" required/>
                <label className="form-label" htmlFor="element_intrinsic_characteristics">What are the intrinsic characteristics of this element?</label>
                <input className="text-input" type="text" name="element_intrinsic_characteristics" value={element_intrinsic_characteristics_value} onChange={onchange} size="40" required/>
                <div className="div-btn">
                    <button className="form-btn" type="button" name="formElement" value="formSitio" onClick={onPrevClick}>
                        <img className="btn-icon prev" src="../images/arrow-right.svg" alt="arrow icon to the rigth"/>
                        Preview
                    </button>
                    <button className="next form-btn" type="button" onClick={onAddClick}>
                        Add
                        <img className="btn-icon" src="../images/Plus.svg" alt="Plus icon"/>
                    </button>
                    <button className="next form-btn" type="button" name="formElement" value="elementCard" onClick={onConnectClick}>
                        Connect
                        <img className="btn-icon" src="../images/Connect.svg" alt="Connect icon"/>
                    </button>
                </div>
            </form> 
        </div>
    )
}


//Connectios and elements

const w = 450, h = 300, r = w > h ? w/4 : h/4, cx=(w/2), cy=(h/2);

const elements = matutu.elements;
//
//matutu.positionElementsInCircle((w/2), (h/2), r, matutu.elements);
//
//const linesData = matutu.getRelationships().relationshipsLines;
//
//const dotsPosition = elements.map(elem => elem.circlePosition);

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
//const textPositions = textCorrection(cx, cy, calculateTextPositions(cx, cy, r, dotsPosition));

function Sitio(props) {
    return (
        <div className="element--title--info">
            <h1>{props.sitioName}</h1>
            <p><span>Inputs:</span> {props.sitioInputs}</p>
            <p><span>Outputs:</span> {props.sitioOutputs}</p>
        </div>
    )
}

function Text(props) {
    return (
        <React.Fragment>
            {props.textPositions.map((elem, i) =>  <text fill="" key={i} x={elem[0]} y={elem[1]}>{elements[i].name}</text>)}
        </React.Fragment>
    )
}

function Lines(props) {
    return (
        <React.Fragment>
            {props.linesData.map((elem, i) =>  <line key={i} x1={elem.positionX1Y1[0]} y1={elem.positionX1Y1[1]} x2={elem.positionX2Y2[0]} y2={elem.positionX2Y2[1]} stroke="black" />)}
        </React.Fragment>
    )
}

function ElementsNetwork(props) {
    return (
        <svg width={props.width} height={props.height} className="svg">
            {props.elements.map((elem, i) => {
                return (
                    <React.Fragment key={i}>
                        <circle key={i} cx={elem.circlePosition[0]} cy={elem.circlePosition[1]} r="5" />
                        {/*<text x={elem.circlePosition[0] + 5} y={elem.circlePosition[1]} >{elem.name}</text>*/}
                        {/*<Lines
                            linesData={props.linesData}
                        />*/}
                        {/*<Text/>*/}
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

//App and States

function App() {

    const [componentsManagement, setComponentsManagement] = React.useState({
        formSitio: true,
        formElement: false,
        elementCard: false
    })

    const [sitioData, setSitioData] = React.useState({});
    const sitioRef = React.useRef(null);
    const [updateRef, setUpdateRef] = React.useState(0);
    React.useEffect(() => {
        sitioRef.current = sitioData;
      }, [updateRef]);

    const [formSitioData, setFormSitioData] = React.useState({
        system_name: "",
        sitio_inputs: "",
        sitio_outputs: ""
    });

    function handleSitioFormChange(e) {
        const {value, name} = e.target;
        setFormSitioData(p => ({
            ...p,
            [name]: value
        }))
    }

    function handleSitioCreate() {
        let name = formSitioData.system_name;
        let outputs = formSitioData.sitio_outputs.split(', ');
        let inputs = formSitioData.sitio_inputs.split(', ');
        let sitio = new Element (name, inputs, outputs, [])
        setSitioData(sitio)
        setUpdateRef(p => p + 1)
    }

    function handleFormSequence (e) {
        const {name, value} = e.target;
        setComponentsManagement( p => ({
            ...p,
            [name]: false,
            [value]: true
        }))
    }

    function onClickNext (e) {
        handleFormSequence(e);
        handleSitioCreate();
    }

    const [elementsData, setElementsData] = React.useState([])

    const initalformElementsData = {
        element_name: "",
        element_inputs: "",
        element_outputs: "",
        element_intrinsic_characteristics: ""
    }

    const [formElementsData, setFormElementData] = React.useState(initalformElementsData);

    function handleElementFormChange(e) {
        const {name, value} = e.target;
        setFormElementData(p => ({
            ...p,
            [name]: value
        }))
    };

    function handleAddElement() {
        const name = formElementsData.element_name;
        const inputs = formElementsData.element_inputs.split(', ');
        const outputs = formElementsData.element_outputs.split(', ');
        setSitioData(p => ({
            ...p,
            elements: [...p.elements, new Element (name, inputs, outputs, [])]
        }));
        setFormElementData(initalformElementsData);
    }


    // --- Extract from class.js
    //function positionElementsInCircle(centerX, centerY, radius, elements) {
    //    let positions = [];
    //    let numElements = elements.length;
    //    let angleBetweenElements = 2 * Math.PI / numElements;
    //  
    //    for (let i = 0; i < numElements; i++) {
    //      let angle = i * angleBetweenElements;
    //      let x = centerX + radius * Math.cos(angle);
    //      let y = centerY + radius * Math.sin(angle);
    //      positions.push([x, y]);
    //    }
    //    for (let i = 0; i < elements.length; i ++) {
    //        elements[i].circlePosition = positions[i];
    //    }
    //    return positions;
    //}
    /// ---

    function connectElements (e) {
        const target = e.target;
        const elem = sitioData.elements;
        const positions = sitioRef.current.positionElementsInCircle((w/2), (h/2), r, elem);
        positions.map((loc, i) => {
            setSitioData(p => {
                p.elements[i].circlePosition = loc;
                return ({
                    ...p
                })
            })
        })
        handleFormSequence(e);
    }

    //consoles
    //matutu.positionElementsInCircle((w/2), (h/2), r, matutu.elements);
    //console.log(matutu.elements)
    //console.log(formSitioData);
    console.log(sitioRef);
    console.log(sitioData);

    return (
        <React.Fragment>
            {componentsManagement.formSitio && <FormSitio
                onclick={onClickNext} 
                handleSitioFormChange={handleSitioFormChange}
                //Inputs values
                system_name_value={formSitioData.element_name}
                sitio_inputs_value={formSitioData.element_inputs}
                sitio_outputs_value={formSitioData.element_outputs}
            />}
            {componentsManagement.formElement && <FormElement
                onPrevClick={handleFormSequence}
                onAddClick={handleAddElement}
                onConnectClick={connectElements}
                onchange={handleElementFormChange} 
                //inputs values
                element_name_value={formElementsData.element_name}
                element_inputs_value={formElementsData.element_inputs}
                element_Outputs_value={formElementsData.element_outputs}
                element_intrinsic_characteristics_value={formElementsData.element_intrinsic_characteristics}
            />}
            {
                componentsManagement.elementCard 
                &&
                <div className="element">
                    <Sitio
                        sitioName={sitioData.name}
                        sitioInputs={sitioData.inputs}
                        sitioOutputs={sitioData.outputs}
                    />
                    <ElementsNetwork 
                        width={w} 
                        height={h}
                        elements={sitioData.elements}
                        linesData={sitioData}
                    />
                </div> 
            }
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>)