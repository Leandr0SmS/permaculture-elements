const calculator = (prevNum, operator, nextNum) => {
    switch (operator) {
        case "x":
            return prevNum * nextNum;
        case "/":
            return prevNum / nextNum;
        case "+":
            return prevNum + nextNum;
        case "-":
            return prevNum - nextNum;
        default:
            return "not valid operators"
    }
};

const operatorSelector = (opr, form) => {
    for (let i = 0; i < form.length; i++) {
        if (form[i] === opr) {
          const calculatedValue = calculator(form[i - 1], form[i], form[i + 1]);
          return [...form.slice(0, i -1), calculatedValue, ...form.slice(i + 2)];
        }
    }
    return [...form]
};

const calculations = (formula) => {
    if (formula.length <= 1) {
        return formula
    } else {
        const mult = operatorSelector("x" || "/", formula);
        const div = operatorSelector("/", mult);
        const minus = operatorSelector("-", div);
        const plus = operatorSelector("+" || "-", minus);
        return calculations(plus);
    }
};

export { calculations }