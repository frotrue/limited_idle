/**
 * 다항식을 일계도함수로 만듭니다.
 * @param equation
 * @returns {any[]}
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

/**
 * 정수를 유니코드 위첨자 문자열로 변환합니다. (10 이상 지원)
 * @param {number} num - 변환할 정수 (차수).
 * @returns {string} 위첨자 문자열.
 */
function toSuperscript(num) {
    // 0과 1은 특별히 처리하여 표시하지 않거나 'x'만 남깁니다.
    if (num === 0) return '';
    if (num === 1) return '';

    // 숫자를 문자열로 변환하고 각 숫자를 위첨자로 치환
    const numStr = String(num);
    let superscript = '';

    // 각 숫자를 위첨자 맵을 사용하여 변환 후 결합
    for (const digit of numStr) {
        superscript += SUPERSCRIPT_MAP[digit] || digit;
    }

    return superscript;
}