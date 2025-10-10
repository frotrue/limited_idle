let fv = 1;
// const max_time = 10;
let x_rate_of_change = 1;

let x = 0;
let y = 0;
let cluster2_fv_add = 0;
let cludter2_open = false;
let equation1 = Array(100).fill(0);
console.log(equation1);

equation1[0] = 0; //garbage

let upgrades = {
    tick: {count : 0, price: 10, tick: 1.0},
    max_x: {count : 0, price: 100, max_x: 10},
    x_increase: {count : 0, price: 100, x_increase: 1.0},
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
    calculate_differentiate_FV(elapsedTime);
    calculateAnimationId = requestAnimationFrame(loop);
}

// 수정된 calculateFV 함수
function calculateFV(elapsedTime) {
    const totalDuration = upgrades.max_x.max_x / (upgrades["tick"].tick);
    x = (elapsedTime / totalDuration) * upgrades.max_x.max_x * upgrades.x_increase.x_increase;
    if (x < upgrades.max_x.max_x) {
        y = equation(x); console.log("x=" + x.toFixed(1) + " | y=" + formatNum(y));
        $("#current_x").text("current x = " + x.toFixed(1));
    }
    else {
    let will_return = equation(upgrades["max_x"].max_x);
    fv += will_return;
    console.log("▶ add! +" + formatNum(will_return) + " get FV (sum: " + formatNum(fv) + ")");
    startTime = performance.now();
    }
}
function calculate_differentiate_FV(elapsedTime) {
    if (cludter2_open === false) return;
    const totalDuration = upgrades.max_x.max_x / (upgrades["tick"].tick);
    x = (elapsedTime / totalDuration) * upgrades.max_x.max_x * upgrades.x_increase.x_increase;
    if (x < upgrades.max_x.max_x) {
        y = equation(x); console.log("x=" + x.toFixed(1) + " | y=" + formatNum(y));
        $("#current_x").text("current x = " + x.toFixed(1));
    }
    else {
        let differentiate_equation = differentiate(equation1);
        cluster2_fv_add += differentiate_equation;
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
    let u = upgrades["max_x"];

    if (fv >= u.price) {
        u.max_x += 1;
        u.max_x = parseFloat(u.max_x.toFixed(0));

        fv -= u.price;
        u.count++;

        if (u.count % 10 === 0) {
            u.price *= 100;
            u.max_x *= 1.3;
            u.max_x = parseFloat(u.max_x.toFixed(1));

        }

        $("#max_x_upgrade_button").text("upgrade" + "max x" + " : " + formatNum(u.price) + " FV");
        $("#lim_x").text("lim x -> " + upgrades.max_x.max_x);
    }
    else {
        console.log("FV not have! (current: " + formatNum(fv) + ")");
    }
}

function x_increase_upgrade() {
    let u = upgrades["x_increase"];

    if (fv >= u.price) {
        u.x_increase += 0.05;
        u.x_increase = parseFloat(u.x_increase.toFixed(2));
        fv -= u.price;
        u.count++;

        if (u.count % 10 === 0) {
            u.price *= 100;
            u.x_increase *= 1.05;
            u.x_increase = parseFloat(u.x_increase.toFixed(2));
        }

        $("#x_increase_upgrade_button").text("upgrade" + "x increase" + " : " + formatNum(u.price) + " FV");
        console.log("x increase = " + u.x_increase);

    }
    else {
        console.log("FV not have! (current: " + formatNum(fv) + ")");
    }
    upgrades.x_increase = u;
}


function show_cluster(num){
$(".cluster").css("display","none");
    $("#cluster_"+num).css("display","block");
}


// setInterval(calculateFV, 100);
startCalculateAnimation()
setInterval(updata, 10);