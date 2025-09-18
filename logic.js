let fv = 1;
const max_time = 10;
const x_rate_of_change = 1;

let x = 0;
let y = 0;
let equation1 = Array(100).fill(0);
console.log(equation1);

equation1[0] = 0; //garbage

let upgrades = {
    tick: {count : 0, price: 10, tick: 1.0},
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

let calculateAnimationId = null;
let startTime = null; // Add a variable to store the start time of the loop

function startCalculateAnimation() {
    if (calculateAnimationId) cancelAnimationFrame(calculateAnimationId);
    startTime = performance.now(); // Set the start time using performance.now()
    loop();
}

// 기존 코드: loop 함수 내에서 currentTime을 인자로 받음
function loop(currentTime) {
    if (!startTime) {
        startTime = currentTime;
    }
    const elapsedTime = (currentTime - startTime) / 1000;
    calculateFV(elapsedTime);
    calculateAnimationId = requestAnimationFrame(loop);
}

// 수정된 calculateFV 함수
function calculateFV(elapsedTime) {
    // totalDuration을 계산하여 tick 값에 따라 전체 소요 시간을 동적으로 변경
    const totalDuration = max_time / (upgrades["tick"].tick);

    // 경과 시간과 총 지속 시간을 기반으로 현재 x 값 계산
    x = (elapsedTime / totalDuration) * max_time;

    if (x < max_time) {
        y = equation(x);
        console.log("x=" + x.toFixed(1) + " | y=" + formatNum(y));
        $("#current_x").text("current x = " + x.toFixed(1));
    } else {
        let will_return = equation(max_time);
        fv += will_return;
        console.log("▶ add! +" + formatNum(will_return) + " get FV (sum: " + formatNum(fv) + ")");

        // 새로운 주기를 위해 startTime 재설정
        startTime = performance.now();
    }
}
function upgrade(n) {
    let u = upgrades[n];

    if (fv >= u.price) {
        u.func += 0.1;
        make_equation(n, u.func, equation1);
        u.func = parseFloat(u.func.toFixed(1));

        fv -= u.price;
        u.count++;

        if (u.count % 10 === 0) {
            u.price *= 100;
            u.func *= 2;
            u.func = parseFloat(u.func.toFixed(1));

            if (upgrades[n+1]) {
                $("#upgrade" + (n+1) + "_button").css("display","inline-block");
            }
        }

        $("#upgrade" + n + "_button").text("upgrade" + n + " : " + formatNum(u.price) + " FV");
        console.log("upgrade" + n + " func = " + formatNum(u.func));
    } else {
        console.log("FV not have! (current: " + formatNum(fv) + ")");
    }
}
function view_equation() {
    let str = "";
    for (let i = equation1.length - 1; i >= 0; i--) {
        if (equation1[i] !== 0) {
            str += (str === "" ? "" : " + ") + parseFloat(equation1[i].toFixed(1)) + "x^" + i;
        }
    }
    return str === "" ? "0" : str;
}

function updata(){
    $("#fv").text("fv = " + formatNum(fv));
    $("#equation").text("equation = " + view_equation());
    // $("#v0").text("Scheduled function value = " + formatNum(equation(x)));
}

let tick = 1;
let tick_upgrade_count = 0;
let tick_upgrade_price = 10;
const base_price = 10;
const growth_factor = 1.2;

function tick_upgrade(){
    let u = upgrades['tick'];
    if (fv >= u.price){
        u.count += 1;
        u.tick += 0.01;
        u.tick = parseFloat(u.tick.toFixed(2));
        fv -= u.price;

        u.price = parseFloat(
            (base_price * Math.pow(growth_factor, u.count)).toFixed(0)
        );

        $("#tick_upgrade_button").text("tick upgrade : " + formatNum(u.price) + " FV");
        // startCalculateInterval();
    }
    upgrades['tick'] = u;
}


function max_x_upgrade() {

}




// setInterval(calculateFV, 100);
startCalculateAnimation()
setInterval(updata, 10);