import { POWER, calculatorButtons } from './buttons.js';


const trigContainer = document.getElementById("trigo_funcs")!;
const trigBlock = document.getElementById("trig-block")!;
const funcContainer = document.getElementById("funcs")!;
const fBlock = document.getElementById("f-block")!;
const funcArrow = document.getElementById("func_arrow")!;
const trigArrow = document.getElementById("trig_arrow")!;
const otherFuncs = document.getElementById("other-funcs")!;
type Expression = string | number | boolean;
type MemoryButton= 'MC' | 'MR' | 'MS' | 'M+' | 'M-' ;
otherFuncs.addEventListener("click", () => {
    changeFuncs();
})
const factorialSearch = "FACTORIAL";
const operators = ["+", "-", "*", "/"];
interface ExpData {
    operation: Array<Expression>,
    formula: Array<Expression>,
}
let data: ExpData = {
    operation: [],
    formula: [],
};
let ans: number | string = 0;
let result: number | string;
let btn: string;
const inputElement = document.querySelector(".btn-wrap")!;
const outputOperationElement = document.querySelector("#display") as HTMLInputElement;
let radian = false;
let memoryValue = 0;
const degBtn = document.getElementById("deg")!;

funcArrow.addEventListener("click", (event) => {
    event.stopPropagation();
});

trigBlock.addEventListener("click", (event) => {
    event.preventDefault();
    if (trigContainer.style.display === "block") {
        trigContainer.style.display = "none";
        funcArrow.style.transform = "rotate(90deg)";
    } else {
        trigContainer.style.display = "block";
        funcArrow.style.transform = "rotate(270deg)";
    }
});

fBlock.addEventListener("click", () => {
    if (funcContainer.style.display === "block") {
        funcContainer.style.display = "none";
        funcArrow.style.transform = "rotate(90deg)";
    } else {
        funcContainer.style.display = "block";
        funcArrow.style.transform = "rotate(270deg)";
    }
});

function angleToggle() {
    if (radian) {
        degBtn.innerHTML = 'RAD';
    } else {
        degBtn.innerHTML = 'DEG';
    }
    return false;
}

function negate(num: number) {
    num = -num;
    return num;
}

function toExponent(number: number) {
    let expVal = number.toExponential();
    return expVal;
}

function changeFuncs() {
    let squareCube = document.getElementById("sq-cube")!.innerHTML;
    let squareCubeRoot = document.getElementById("sq-cube-root")!.innerHTML;
    if (squareCube=== "x²") {
        document.getElementById("sq-cube")!.innerHTML = "x​³";
    } else {
        document.getElementById("sq-cube")!.innerHTML = "x²";
    }
    if (squareCubeRoot === "√x") {
        document.getElementById("sq-cube-root")!.innerHTML = "∛x";
    } else {
        document.getElementById("sq-cube-root")!.innerHTML = "√x";
    }
}

inputElement.addEventListener("click", (event) => {
    const targetBtn = event.target as Element;
    btn = targetBtn.innerHTML;
    for (let button of calculatorButtons) {
        if (button.symbol == targetBtn.innerHTML) {
            calculator(button);
            memoryFunction(btn as MemoryButton);
            break;
        }
    }
});

function memoryFunction(btn: MemoryButton) {
    switch (btn) {
        case "MC":
            memoryValue = 0;
            break;
        case "MR":
            updateOutputresult(memoryValue);
            break;
        case "M+":
            memoryValue = memoryValue + parseInt((outputOperationElement as HTMLInputElement).value);
            break;
        case "M-":
            memoryValue -= parseInt((outputOperationElement as HTMLInputElement).value);
            break;
        case "MS":
            memoryValue = parseInt((outputOperationElement as HTMLInputElement).value);
            break;
        default:
            return;
    }
    if (memoryValue === 0) {
        document.getElementsByClassName("memory-btn")[0].classList.add("disabled");
        document.getElementsByClassName("memory-btn")[1].classList.add("disabled");
        document.getElementsByClassName("memory-btn")[0].classList.add("btn");
        document.getElementsByClassName("memory-btn")[1].classList.add("btn");
    } else {
        document
            .getElementsByClassName("memory-btn")[0]
            .classList.remove("disabled");
        document
            .getElementsByClassName("memory-btn")[1]
            .classList.remove("disabled");
        document.getElementsByClassName("memory-btn")[0].classList.remove("btn");
        document.getElementsByClassName("memory-btn")[1].classList.remove("btn");
    }
}

function decimalCount(num: number | string) {
    const numStr = String(num);
    if (numStr.includes(".")) {
        return numStr.split(".")[1].length;
    }

    return 0;
}
interface CalcBtns {
    name: string,
    symbol: string | number,
    formula: Expression,
    type: string
}
function calculator(button: CalcBtns) {
    if (button.type === "operator") {
        if (button.name === "mod") {
            data.operation.push(button.formula);
        } else if (button.name === "value-mod") {
            data.operation.push("(");
        } else {
            data.operation.push(button.symbol);
        }
        data.formula.push(button.formula);
    } else if (button.type === "number") {
        data.formula.push(button.formula);
        if (button.name === "Inverse") {
            data.operation.push(button.formula);
        } else {
            data.operation.push(button.symbol);
        }
    } else if (button.type === "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    } else if (button.type === "math_function") {
        let symbol, formula;

        if (button.name === "factorial") {
            symbol = "!";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "power") {
            if (button.symbol === "10<sup>x</sup>") {
                data.operation.push('10');
                data.operation.push("^(");
                data.formula.push(10);
            } else {
                symbol = "^(";
                data.operation.push(symbol);
            }
            formula = button.formula;
            data.formula.push(formula);
        } else if (button.name === "square") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        } else if (button.name === "square-root") {
            symbol = "√(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "invert_sign") {
            symbol = "negate(";
            formula = "negate(";
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "fixedToExponent") {
            symbol = button.formula;
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "cube") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("3)");
            data.formula.push("3)");
        } else if (button.name === "cube-root") {
            symbol = "∛(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (
            button.name === "trunc" ||
            button.name === "floor" ||
            button.name === "ceil" ||
            button.name === "sign" ||
            button.name === "round"
        ) {
            symbol = button.symbol + "(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "ln") {
            symbol = "ln(";
            formula = button.formula + "(";

            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "log") {
            symbol = "log(";
            formula = button.formula + "(";

            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name === "exp") {
            symbol = "exp(";
            formula = button.formula + "(";

            data.operation.push(symbol);
            data.formula.push(formula);
        } else {
            symbol = button.symbol + "(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    } else if (button.type === "key") {
        if (button.name === "clear") {
            data.operation = [];
            data.formula = [];
            updateOutputresult('0');
        } else if (button.name === "delete") {
            data.operation.pop();
            data.formula.pop();
        } else if (button.name === "deg") {
            radian = true;
            angleToggle();

        } else if (button.name === "rad") {
            radian = false;
            angleToggle();
        }

    } else if (button.type === "calculate") {
        let formulaStr = data.formula.join("");
        let powerSearchresult = search(data.formula, POWER);
        let factorialSearchresult = search(data.formula, factorialSearch);
        const bases = powerbasegetter(data.formula,powerSearchresult);
        const numbers = factorialnumgetter(data.formula, factorialSearchresult);

        bases.forEach((base) => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formulaStr = formulaStr.replace(toReplace, replacement);
        });

        numbers.forEach((num) => {
            formulaStr = formulaStr.replace(num.toReplace, num.replacement);
        });

        try {
            result = Number(eval(formulaStr));
            var decCount = decimalCount(result);
            if (decCount > 5) {
                result = (parseFloat(result.toPrecision(5)));
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "SyntaxError";
                updateOutputresult(result);
                return;
            }
        }

        ans = result;
        data.operation = [result];
        data.formula = [result];
        updateOutputresult(result);
        return;
    }
    updateOutputOperation(data.operation.join(""));
}
interface ReplaceType {
    toReplace: string,
    replacement: string
}
function factorialnumgetter(formula: Array<Expression>, factorialSearchresult: number[]) {
    let numbers: ReplaceType[] = [];

    factorialSearchresult.forEach((factIndex) => {
        let num: Array<Expression> = [];
        let prevIdx= factIndex - 1;

        while (prevIdx >= 0) {
            let isOperator = false;

            operators.forEach((operator) => {
                if (formula[prevIdx] === operator) {
                    isOperator = true;
                }
            });

            if ((isOperator)) {
                break;
            }

            num.unshift(formula[prevIdx]);
            prevIdx--;
        }

        let numberStr = num.join("");
        const factorial = "factorial(",
            closeParen = ")";
        let toReplace = numberStr + factorialSearch;
        let replacement = factorial + numberStr + closeParen;
        numbers.push({
            toReplace: toReplace,
            replacement: replacement,
        });
    });
    return numbers;
}

function powerbasegetter(formula: Array<Expression>, powerSearchresult: number[]) {
    let powersBase: (number | string)[] = [];

    powerSearchresult.forEach((powerIndex) => {
        let base: Array<Expression> = [];
        let parenCount = 0;
        let prevIdx = powerIndex - 1;

        while (prevIdx >= 0) {
            let isOperator = false;

            if (formula[prevIdx] === "(") {
                parenCount -= 1;
            }

            if (formula[prevIdx] === ")") {
                parenCount += 1;
            }

            operators.forEach((operator) => {
                if (formula[prevIdx] === operator) {
                    isOperator = true;
                }
            });

            let isPower = formula[prevIdx] === POWER;

            if ((isOperator && parenCount === 0) || isPower) {
                break;
            }

            base.unshift(formula[prevIdx]);
            prevIdx--;
        }
        powersBase.push(base.join(""));
    });

    return powersBase;
}

function search(array: Array<Expression>, keyword: string) {
    let searchRes: number[] = [];

    array.forEach((element, index) => {
        if (element == keyword) {
            searchRes.push(index);
        }
    });

    return searchRes;
}

function updateOutputOperation(operation: string) {
    outputOperationElement.value = operation;
}

function updateOutputresult(result: (number | string)) {
    outputOperationElement.value = result.toString();
}

function trigo(callback: (angle: number) => number, angle: number) {
    if (!radian) {
        angle = (angle * Math.PI) / 180;
    }

    return callback(angle);
}

function inv_trigo(callback: (angle: number) => number, value: number) {
    let angle = callback(value);

    if (!radian) {
        angle = (angle * 180) / Math.PI;
    }

    return angle;
}

function factorial(number: number) {
    if (number % 1 !== 0) {
        return gamma(number + 1);
    }

    if (number === 0 || number === 1) {
        return 1;
    }

    let result = 1;

    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    return result;
}

function gamma(n: number): number {
    var g = 7,
        p = [
            0.99999999999980993, 676.5203681218851, -1259.1392167224028,
            771.32342877765313, -176.61502916214059, 12.507343278686905,
            -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
        ];

    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    } else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
    }
}
