/**
 * 다항식을 일계도함수로 만듭니다.
 * @param equation 원함수
 * @returns {any[]} 도함수
 */
function differentiate(equation){
    let temp = Array(equation.length-1).fill(0);
    for (let i = 1; i < equation.length; i++) {
        temp[i - 1] = equation[i] * i;
    }
    console.log(temp);
    return temp;
}


/**
 * 큰 수를 지수표기법으로 전환합니다
 * @param num
 * @returns {string}
 */
function formatNum(num) {
    if (num < 1000) return Number(num).toFixed(1);
    return Number(num).toExponential(1).replace("+", "");
}

/**
 * 다항식에 새로운 차장을 추가
 * @param index
 * @param number
 * @param equation
 * @returns {*}
 */
function make_equation(index, number,equation) {
    equation[index] = number;
    return equation;
}

/**
 * 다항식의 값을 계산합니다.
 * @param {array} x - 다항식의 계수의 배열
 * @returns {number} 다항식의 값
 */
function equation(x) {
    let temp = 0;
    for (let i = 0; i < equation1.length; i++) {
        if (equation1[i] !== 0) {
            temp += equation1[i] * Math.pow(x, i);
        }
    }
    return temp;
}

const SUPERSCRIPT_MAP = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
};

/**
 * 정수를 유니코드 위첨자 문자열로 변환합니다.
 * @param {number} num - 변환할 정수 (차수).
 * @returns {string} 위첨자 문자열.
 */
function toSuperscript(num) {
    if (num === 0) return '';
    if (num === 1) return '';
    const numStr = String(num);
    let superscript = '';
    for (const digit of numStr) {
        superscript += SUPERSCRIPT_MAP[digit] || digit;
    }

    return superscript;
}


function view_equation() {
    let str = "";
    for (let i = equation1.length - 1; i >= 0; i--) {
        const coefficient = equation1[i];

        if (coefficient !== 0) {
            let term = "";
            const formattedCoefficient = parseFloat(coefficient.toFixed(1));
            if (i === 0 || formattedCoefficient !== 1) {
                term += formattedCoefficient;
            }
            if (i > 0) {
                term += "x";
                const superscript = toSuperscript(i);
                term += superscript;
            }
            if (str !== "") {
                str += " + ";
            }
            str += term;
        }
    }
    return str === "" ? "0" : str;
}