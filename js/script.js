import {POWER,calculator_buttons} from './buttons.js';


const trig_container = document.getElementById("trigo_funcs");
const trig_block = document.getElementById("trig-block");
const func_container = document.getElementById("funcs");
const f_block = document.getElementById("f-block");
const func_arrow = document.getElementById("func_arrow");
const trig_arrow = document.getElementById("trig_arrow");
const other_funcs=document.getElementById("other-funcs");

other_funcs.addEventListener("click",()=>{
  changeFuncs();
})
const FACTORIAL = "FACTORIAL";
const OPERATORS = ["+", "-", "*", "/"];
let data = {
  operation: [],
  formula: [],
};
let ans = 0;
let result;
let btn;
const input_element = document.querySelector(".btn-wrap");
const output_operation_element = document.querySelector("#display");
let RADIAN = false;
let memory_value = 0;
const deg_btn = document.getElementById("deg");

trig_arrow.addEventListener("click", (event) => {
  event.stopPropagation();
});

trig_block.addEventListener("click", (event) => {
  event.preventDefault();
  if (trig_container.style.display == "block") {
    trig_container.style.display = "none";
    trig_arrow.style.transform = "rotate(90deg)";
  } else {
    trig_container.style.display = "block";
    trig_arrow.style.transform = "rotate(270deg)";
  }
});

f_block.addEventListener("click", () => {
  if (func_container.style.display == "block") {
    func_container.style.display = "none";
    func_arrow.style.transform = "rotate(90deg)";
  } else {
    func_container.style.display = "block";
    func_arrow.style.transform = "rotate(270deg)";
  }
});

function angleToggle() {
  if (RADIAN){
    deg_btn.innerHTML='RAD';
  }else{
    deg_btn.innerHTML='DEG';
  }
  return false;
}

function negate(num) {
  num = -num;
  return num;
}

function toExponent(number) {
  return number.toExponential();
}

function changeFuncs() {
 let square_cube = document.getElementById("sq-cube").innerHTML;
 let square_cube_root = document.getElementById("sq-cube-root").innerHTML;
  if (square_cube == "x??") {
    document.getElementById("sq-cube").innerHTML = "x?????";
  } else {
    document.getElementById("sq-cube").innerHTML = "x??";
  }
  if (square_cube_root == "???x") {
    document.getElementById("sq-cube-root").innerHTML = "???x";
  } else {
    document.getElementById("sq-cube-root").innerHTML = "???x";
  }
}

input_element.addEventListener("click", (event) => {
  const target_btn = event.target;
  btn=target_btn.innerHTML;
  for(let button of calculator_buttons){
    if (button.symbol == target_btn.innerHTML) {
           calculator(button);
           memoryFunction(button);
           break;
        }
  }
});

function memoryFunction(button) {
  switch (btn) {
    case "MC":
      memory_value = 0;
      break;
    case "MR":
      updateOutputresult(memory_value);
      break;
    case "M+":
      memory_value = memory_value + parseInt(output_operation_element.value);
      break;
    case "M-":
      memory_value -= parseInt(output_operation_element.value);
      break;
    case "MS":
      memory_value = parseInt(output_operation_element.value);
      break;
    default:
      return;
  }
  if (memory_value === 0) {
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

function decimalCount(num) {
  const numStr = String(num);
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }

  return 0;
}

function calculator(button) {
  if (button.type == "operator") {
    if (button.name == "mod") {
      data.operation.push(button.formula);
    } else if (button.name == "value-mod") {
      data.operation.push("(");
    } else {
      data.operation.push(button.symbol);
    }
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.formula.push(button.formula);
    if (button.name == "Inverse") {
      data.operation.push(button.formula);
    } else {
      data.operation.push(button.symbol);
    }
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;

    if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      if (button.symbol == "10<sup>x</sup>") {
        data.operation.push(10);
        data.operation.push("^(");
        data.formula.push(10);
      } else {
        symbol = "^(";
        data.operation.push(symbol);
      }
      formula = button.formula;
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
      data.operation.push("2)");
      data.formula.push("2)");
    } else if (button.name == "square-root") {
      symbol = "???(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "invert_sign") {
      symbol = "negate(";
      formula = "negate(";
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "fixedToExponent") {
      symbol = button.formula;
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "cube") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
      data.operation.push("3)");
      data.formula.push("3)");
    } else if (button.name == "cube-root") {
      symbol = "???(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (
      button.name == "trunc" ||
      button.name == "floor" ||
      button.name == "ceil" ||
      button.name == "sign" ||
      button.name == "round"
    ) {
      symbol = button.symbol + "(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "ln") {
      symbol = "ln(";
      formula = button.formula + "(";

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "log") {
      symbol = "log(";
      formula = button.formula + "(";

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "exp") {
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
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];
      updateOutputresult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "deg") {
      RADIAN = true;
      angleToggle();

    }else if (button.name == "rad") {
      RADIAN=false;
      angleToggle();
    }
    
  } else if (button.type == "calculate") {
   let formula_str = data.formula.join("");
    let POWER_SEARCH_RESULT = search(data.formula, POWER);
    let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);
    const BASES = powerbasegetter(data.formula, POWER_SEARCH_RESULT);
    const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT);

    BASES.forEach((base) => {
      let toreplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";

      formula_str = formula_str.replace(toreplace, replacement);
    });

    NUMBERS.forEach((number) => {
      formula_str = formula_str.replace(number.toReplace, number.replacement);
    });

    try {
      result = eval(formula_str);
      var decCount = decimalCount(result);
      if (decCount > 4) {
        result = result.toPrecision(4);
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

function factorialnumgetter(formula, FACTORIAL_SEARCH_RESULT) {
  let numbers = [];

  FACTORIAL_SEARCH_RESULT.forEach((fact_index) => {
    let number = [];
    let prev_idx = fact_index - 1;

    while (prev_idx >= 0) {
      let is_operator = false;

      OPERATORS.forEach((OPERATOR) => {
        if (formula[prev_idx] == OPERATOR) {
          is_operator = true;
        }
      });

      if ((is_operator)) {
        break;
      }

      number.unshift(formula[prev_idx]);
      prev_idx--;
    }

    let number_str = number.join("");
    const factorial = "factorial(",
      close_paren = ")";
    let toreplace = number_str + FACTORIAL;
    let replacement = factorial + number_str + close_paren;
    numbers.push({
      toReplace: toreplace,
      replacement: replacement,
    });
  });
  return numbers;
}

function powerbasegetter(formula, POWER_SEARCH_RESULT) {
  let powers_base = [];

  POWER_SEARCH_RESULT.forEach((power_index) => {
    let base = [];
    let paren_count = 0;
    let prev_idx = power_index - 1;

    while (prev_idx >= 0) {
      let is_operator = false;

      if (formula[prev_idx] == "(") {
        paren_count -= 1;
      }

      if (formula[prev_idx] == ")") {
        paren_count += 1;
      }

      OPERATORS.forEach((OPERATOR) => {
        if (formula[prev_idx] == OPERATOR) {
          is_operator = true;
        }
      });

      let is_power = formula[prev_idx] == POWER;

      if ((is_operator && paren_count == 0) || is_power) {
        break;
      }

      base.unshift(formula[prev_idx]);
      prev_idx--;
    }
    powers_base.push(base.join(""));
  });

  return powers_base;
}

function search(array, keyword) {
  let search_res = [];

  array.forEach((element, index) => {
    if (element == keyword) {
      search_res.push(index);
    }
  });

  return search_res;
}

function updateOutputOperation(operation) {
  output_operation_element.value = operation;
}

function updateOutputresult(result) {
  output_operation_element.value = result;
}

function trigo(callback, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }

  return callback(angle);
}

function inv_trigo(callback, value) {
  let angle = callback(value);

  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }

  return angle;
}

function factorial(number) {
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

function gamma(n) {
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
