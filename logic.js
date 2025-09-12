let fv = 1;
let max_time = 10;
let x = 0;
let y = 0;
let equation1 = Array(100).fill(0);
console.log(equation1);

equation1[0] = 0; //garbage

let upgrades = {
    1: {count : 0, price: 1, func: 0.0},
    2: {count : 0, price: 10, func: 0.0},
    3: {count : 0, price: 100, func: 0.0},
    4: {count : 0, price: 1000, func: 0.0},
    5: {count : 0, price: 10000, func: 0.0},
    6: {count : 0, price: 100000, func: 0.0},
    7: {count : 0, price: 1000000, func: 0.0},
    8: {count : 0, price: 10000000, func: 0.0},
    9: {count : 0, price: 100000000, func: 0.0},
    10:{count : 0, price: 1000000000, func: 0.0},
    11:{count : 0, price: 10000000000, func: 0.0},
    12:{count : 0, price: 100000000000, func: 0.0},
    13:{count : 0, price: 1000000000000, func: 0.0},
    14:{count : 0, price: 10000000000000, func: 0.0},
    15:{count : 0, price: 100000000000000, func: 0.0},
};

// 숫자 포맷 함수
function formatNum(num) {
    if (num < 1000) return Number(num).toFixed(1);
    return Number(num).toExponential(1).replace("+", "");
}

let calculateIntervalId = null;
function startCalculateInterval() {
    if (calculateIntervalId) clearInterval(calculateIntervalId);
    let interval = parseFloat((100 / tick).toFixed(2));
    calculateIntervalId = setInterval(calculateFV, interval);
}

function make_equation(index, number) {
    equation1[index] = number;
    return equation1
}

function equation(t) {
    let temp = 0;
    for (let i = 1; i < equation1.length; i++) {
        if (equation1[i] !== 0) {
            temp += equation1[i] * Math.pow(t, i);
        }
    }
    return temp;
}

function calculateFV() {
    if (x < max_time) {
        y = equation(x);
        console.log("x=" + x + " | y=" + formatNum(y));
        x += parseFloat(0.1.toFixed(1));
        x = parseFloat(x.toFixed(1))
        $("#current_x").text("current x =" + x);
    } else {
        let will_return = equation(max_time);
        fv += will_return;
        console.log("▶ 주기 완료! +" + formatNum(will_return) + " FV 획득 (총합: " + formatNum(fv) + ")");
        x = 0;
        y = 0;
    }
}

function upgrade(n) {
    let u = upgrades[n];

    if (fv >= u.price) {
        u.func += 0.1;
        make_equation(n, u.func);
        u.func = parseFloat(u.func.toFixed(1));

        fv -= u.price;
        u.count++;

        if (u.count % 10 === 0) {
            u.price *= 100;
            u.func *= 2;
            u.func = parseFloat(u.func.toFixed(1));

            // 다음 업그레이드 버튼 열기
            if (upgrades[n+1]) {
                $("#upgrade" + (n+1) + "_button").css("display","inline-block");
            }
        }

        $("#upgrade" + n + "_button").text("upgrade" + n + " : " + formatNum(u.price) + " FV");
        console.log("업그레이드 성공! upgrade" + n + " func = " + formatNum(u.func));
    } else {
        console.log("FV 부족! (현재: " + formatNum(fv) + ")");
    }
}

function updata(){
    $("#fv").text("fv = " + formatNum(fv));
    // $("#v0").text("Scheduled function value = " + formatNum(equation(x)));
}

let tick = 1;
let tick_upgrade_count = 0;
let tick_upgrade_price = 10;
const base_price = 10;
const growth_factor = 1.2;

function tick_upgrade(){
    if (fv >= tick_upgrade_price){
        tick_upgrade_count += 1;
        tick += 0.01;
        tick = parseFloat(tick.toFixed(2));
        fv -= tick_upgrade_price;

        tick_upgrade_price = parseFloat(
            (base_price * Math.pow(growth_factor, tick_upgrade_count)).toFixed(0)
        );

        $("#tick_upgrade_button").text("tick upgrade : " + formatNum(tick_upgrade_price) + " FV");
        startCalculateInterval();
    }
}

// setInterval(calculateFV, 100);
startCalculateInterval();
setInterval(updata, 10);