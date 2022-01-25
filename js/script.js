const trig_container = document.getElementById("trigo_funcs");
const trig_block = document.getElementById("trig-block");
const func_container = document.getElementById("funcs");
const f_block = document.getElementById("f-block");
const func_arrow = document.getElementById("func_arrow");
const trig_arrow = document.getElementById("trig_arrow");
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
const OPERATORS = ["+", "-", "*", "/"];
let data = {
  operation: [],
  formula: [],
};
let ans = 0;
let calculator_buttons = [
  {
    name: "deg",
    symbol: "DEG",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√x",
    formula: "Math.sqrt(",
    type: "math_function",
  },
  {
    name: "cube-root",
    symbol: "∛x",
    formula: "Math.cbrt(",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },

  {
    name: "cube",
    symbol: "x​³",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "invert_sign",
    symbol: "+/-",
    formula: "negate(",
    type: "math_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "n!",
    formula: "FACTORIAL",
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<sup>y</sup>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "power",
    symbol: "10<sup>x</sup>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "trunc",
    symbol: "trunc",
    formula: "Math.trunc(",
    type: "math_function",
  },
  {
    name: "floor",
    symbol: "floor",
    formula: "Math.floor(",
    type: "math_function",
  },
  {
    name: "ceil",
    symbol: "ceil",
    formula: "Math.ceil(",
    type: "math_function",
  },
  {
    name: "round",
    symbol: "round",
    formula: "Math.round(",
    type: "math_function",
  },
  {
    name: "sign",
    symbol: "sign",
    formula: "Math.sign(",
    type: "math_function",
  },
  {
    name: "fixedToExponent",
    symbol: "F-E",
    formula: "toExponent(",
    type: "math_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "Inverse",
    symbol: "1/x",
    formula: "(1/",
    type: "number",
  },
  {
    name: "mod",
    symbol: "mod",
    formula: "%",
    type: "operator",
  },
  {
    name: "value-mod",
    symbol: "|x|",
    formula: "Math.abs(",
    type: "operator",
  },
  {
    name: "memory-store",
    symbol: "MS",
    formula: false,
    type: "memory_function",
  },
  {
    name: "memory-clear",
    symbol: "MC",
    formula: false,
    type: "memory_function",
  },
  {
    name: "memory-recall",
    symbol: "MR",
    formula: false,
    type: "memory_function",
  },
  {
    name: "memory-add",
    symbol: "M+",
    formula: false,
    type: "memory_function",
  },
  {
    name: "memory-subtract",
    symbol: "M-",
    formula: false,
    type: "memory_function",
  },
];
const input_element = document.querySelector(".btn-wrap");
const output_operation_element = document.querySelector("#display");
let RADIAN = true;
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
  deg_btn.classList.toggle("active-angle");
  event.stopPropagation();
  RADIAN = !RADIAN;
}

function negate(num) {
  num = -num;
  return num;
}

function toExponent(number) {
  return number.toExponential();
}

function changeFuncs() {
  square_cube = document.getElementById("sq-cube").innerHTML;
  square_cube_root = document.getElementById("sq-cube-root").innerHTML;
  if (square_cube == "x²") {
    document.getElementById("sq-cube").innerHTML = "x​³";
  } else {
    document.getElementById("sq-cube").innerHTML = "x²";
  }
  if (square_cube_root == "√x") {
    document.getElementById("sq-cube-root").innerHTML = "∛x";
  } else {
    document.getElementById("sq-cube-root").innerHTML = "√x";
  }
}

input_element.addEventListener("click", (event) => {
  const target_btn = event.target;
  calculator_buttons.forEach((button) => {
    if (button.symbol == target_btn.innerHTML) {
      calculator(button);
      memoryFunction(button);
    }
  });
});

function memoryFunction(button) {
  let btn = event.target.innerHTML;
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
      symbol = "√(";
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
      symbol = "∛(";
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
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];
      updateOutputresult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggle();
    }
  } else if (button.type == "calculate") {
    formula_str = data.formula.join("");
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
  if (number % 1 != 0) {
    return gamma(number + 1);
  }

  if (number == 0 || number == 1) {
    return 1;
  }

  let result = 1;

  for (let i = 1; i <= number; i++) {
    result *= i;
  }

  if (result == Infinity) {
    return Infinity;
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
