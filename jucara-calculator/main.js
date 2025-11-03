import { numbersData } from "./data/numbers.js";
import { operatorsData } from "./data/operators.js";
import { questions } from "./data/questions.js"
import { divide } from "./functions/calc-functions.js"
const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumCLick, onOprCLick, onAcClick, display, formula, onStartClick }) => {

    const numbers = numbersData.map(num => {
        return (
            <button 
                key={num.id}
                type="button" 
                className="number btn" 
                onClick={onNumCLick} 
                id={num.id}
                value={num.sign}
            >
                {num.sign}
            </button>  
        )
    });

    const operators = operatorsData.map(opr => {
        return (
            <button 
                key={opr.id}
                type="button" 
                className="number btn" 
                onClick={onOprCLick} 
                id={opr.id}
                value={opr.sign}
            >
                {opr.sign}
            </button>  
        )
    });

    return (
        <div id="calculator">
            <div id="screen">
                <div id="formula">{formula}</div>
                <div id="display">{display}</div>
            </div>
            <button 
                type="button" 
                className="btn big" 
                id="clear" 
                onClick={onAcClick}
            >
                AC
            </button>
            <div id="main">
                <div id="numbers">
                    {numbers}
                </div>
                <div id="operators">
                    {operators}
                </div>
            </div>
            <button 
                type="button" 
                className="btn big" 
                id="start" 
                value="="
                onClick={onStartClick} 
            >
                Start
            </button>
        </div>
    )
};

const App = () => {

    const [questionIndex, setQuestionIndex] = useState(-1);
    const [display, setDisplay] = useState([]);
    const [jucaraData, setJucaraData] = useState({
        weight: 0,
        waterPercent: 0,
    });

    const handleStartClick = () => {
        setQuestionIndex(0)
        setDisplay([])
    }

    const handleNumberCLick = (e) => {
        const value = e.target.value;
        if (value == ".") {
            setDisplay((d) => {
                if ([...d].indexOf('.') > 0) {
                    return [...d];
                }  else {
                    return [...d, "."];
                }
            })
        } else {
            if (display.length == 1 && display[0] == 0) {
                setDisplay((d) => [parseFloat(value)]);
            } else {
                setDisplay((d) => [...d, parseFloat(value)]);
            }
        }
    };

    const handleAcClick = () => {
        setDisplay([]);
        setQuestionIndex(-1);
    };

    const handleOperators = (e) => {
        const operator = e.target.value;
        const questionId = questions[questionIndex].id;
        switch (operator) {
            case "Next":
                if (questionId == "calcular") {
                    setQuestionIndex(q => q + 1);
                    const response = divide(jucaraData.weight);
                    setDisplay(`
                        ${response.rounds} X ${response.weight}Kg / ${((response.weight / 100) * jucaraData.waterPercent).toFixed(2)}L`
                        );
                    break;
                } else {
                    setJucaraData(j => ({
                        ...j,
                        [questionId]: parseFloat(display.join(''))
                    }));
                    setQuestionIndex(q => q + 1);
                    setDisplay([0]);
                    break;
                }
            case "Prev":
                setQuestionIndex(q => q - 1)
                setDisplay([]);
                break;
            case "sim":
                return 'sim';
            case "não":
                return 'nao';
            default:
                return "not valid operators"
        }
    };

    const displayQuestion = questionIndex >= 0 ? questions[questionIndex].question : "Press Start"

    return (
        <Calculator
            onStartClick={handleStartClick}
            onNumCLick={handleNumberCLick}
            onAcClick={handleAcClick}
            onOprCLick={handleOperators}
            display={display}
            formula={displayQuestion}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);