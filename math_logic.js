function differentiate(equation){
    let temp = Array(equation.length-1).fill(0);
    for (let i = 1; i < equation.length; i++) {
        temp[i - 1] = equation[i] * i;
    }
    console.log(temp);
    return temp;
}

function formatNum(num) {
    if (num < 1000) return Number(num).toFixed(1);
    return Number(num).toExponential(1).replace("+", "");
}

function make_equation(index, number,equation) {
    equation[index] = number;
    return equation;
}

function equation(t) {
    let temp = 0;
    for (let i = 1; i < t.length; i++) {
        if (t[i] !== 0) {
            temp += t[i] * Math.pow(t, i);
        }
    }
    return temp;
}