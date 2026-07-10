const displayElement = document.getElementById('calc-display');
const buttonRoutes = new Map([
  ["calc-0", 0],
  ["calc-1", 1],
  ["calc-2", 2],
  ["calc-3", 3],
  ["calc-4", 4],
  ["calc-5", 5],
  ["calc-6", 6],
  ["calc-7", 7],
  ["calc-8", 8],
  ["calc-9", 9],
  ["calc-plus", '+'],
  ["calc-minus", '-'],
  ["calc-times", '*'],
  ["calc-divide", '/'],
  ["calc-clear", 'clear'],
  ["calc-equals", '='],
  ["calc-dot", '.'],
  ["calc-back", 'back'],
  ["calc-sign", 'sign']
]);

let calculation = "";
let prevNum = false;
let usedDot = false;
let finalResult = true;

calculatePostfix = (tokens) => {
    const stack = [];
    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            const b = stack.pop(), a = stack.pop();
            if (token === '+') stack.push(a + b);
            if (token === '-') stack.push(a - b);
            if (token === '*') stack.push(a * b);
            if (token === '/') stack.push(a / b);
        }
    }
    return stack[0];
}

assessArithmeticString = (s) => {
	const ranks = new Map([
		["+", 10],
		["-", 10],
		["*", 20],
		["/", 20]
	]);
	
	let operands = [];
	let operators = [];

	let completed = 0;
	let tokens = s.split(" ");

    for (let token of tokens) {
        if (!isNaN(parseFloat(token))) {
            operands.push(token);
        } else if (ranks.has(token)) {
            while (operators.length > 0 && 
                   ranks.get(operators[operators.length - 1]) >= ranks.get(token)) {
				   
                operands.push(operators.pop());
            }
            operators.push(token);
        }
    }
	
	while (operators.length > 0) {
		operands.push(operators.pop());
	}
	
	return calculatePostfix(operands);
}

allClear = () => {
	calculation = "0";
	displayElement.innerHTML = calculation;
	finalResult = true;
}

document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const elementId = clickedElement.id;

	if (!elementId) { return; }
	
	const response = buttonRoutes.get(elementId);
	if (response !== undefined) {
		if (Number.isFinite(response)) {
			if (finalResult) {
				calculation = "";
				finalResult = false;
			}
			calculation += response;
			displayElement.innerHTML = calculation;
			prevNum = true;
		} else if (!Number.isFinite(response)
				&& prevNum
				&& (response == '+' 
				|| response == '-'
				|| response == '*' 
				|| response == '/')) {

				calculation += " " + response + " ";
				displayElement.innerHTML = calculation;
				prevNum = false;
				usedDot = false;
				finalResult = false;
		} else if (response == 'clear') {
			allClear();
			prevNum = false;
			usedDot = false;
		} else if (response == '=' && prevNum) {
			calculation = assessArithmeticString(calculation);
			displayElement.innerHTML = calculation.toString();
			prevNum = true;
			usedDot = false;
			finalResult = true;
		} else if (response == '.' 
				&& (!finalResult || calculation === "0")
				&& !usedDot) {
					
			if (calculation === "0") {
				finalResult = false;
			}
			calculation += response;
			displayElement.innerHTML = calculation;
			usedDot = true;
		} else if (response == "back") {
			if (calculation.length <= 1 || finalResult) {
				allClear();
			} else if (calculation.at(-2) == ".") {
				calculation = calculation.toString().slice(0, -1);
				displayElement.innerHTML = calculation;
				usedDot = false;
			} else if (prevNum) {
				calculation = calculation.toString().slice(0, -1);
				displayElement.innerHTML = calculation;
				if (isNaN(parseFloat(calculation.at(-1)))) {
					prevNum = false;
				}
			} else {
				calculation = calculation.toString().slice(0, -3);
				displayElement.innerHTML = calculation;
				prevNum = true;
			}
		} else if (response == "sign" 
				&& prevNum 
				&& !finalResult
				&& calculation !== "0") {
			let i = calculation.length - 1;
			while (i >= 0 && (!isNaN(parseFloat(calculation[i])) || calculation[i] == ".")) {
				i--;
			}
			
			if (i == -1) {
				calculation = '-' + calculation;
			} else if (calculation[i] == '-') {
				calculation = calculation.slice(0, i) + calculation.slice(i + 1, calculation.length);
			} else {
				calculation = calculation.slice(0, i + 1) + '-' + calculation.slice(i + 1, calculation.length);
			}
			displayElement.innerHTML = calculation;
		}
	}
});

allClear();