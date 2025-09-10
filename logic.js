let fv = 0;               // 총 얻은 값
let max_time = 10;        // 10초 주기
let x = 0;     // 현재 시간
let y = 0;                // 현재 함수값


let one_func = 0;
let upgrade1_price = 0;// 1차함수 계수

let calculateIntervalId = null;
function startCalculateInterval() {
    if (calculateIntervalId) clearInterval(calculateIntervalId);
    let interval = parseFloat((100 / tick).toFixed(2));
    calculateIntervalId = setInterval(calculateFV, interval);
}

function equation(t) {
    return parseFloat((one_func * t).toFixed(1));
}

function calculateFV() {
    if (x < max_time) {
        y = equation(x);
        console.log("x=" + x + " | y=" + y);
        x += parseFloat(0.1.toFixed(1));
        x = parseFloat(x.toFixed(1))
        if (Number.isInteger(x)) {
            $("#current_x").text("current x ="+x+".0")
        }
        else $("#current_x").text("current x ="+x)
        x = parseFloat(x.toFixed(1));
    } else {
        let will_return = equation(max_time);
        fv += will_return;
        console.log("▶ 주기 완료! +" + will_return + " FV 획득 (총합: " + fv + ")");
        x = 0;
        y = 0;
    }
}
let upgrade1_count = 0;
function upgrade1(){
    if (fv >= upgrade1_price) {
        one_func += 0.1;
        one_func = parseFloat(one_func.toFixed(1));
        fv -= upgrade1_price;
        if (upgrade1_price ===0){
            upgrade1_price = 3;
            upgrade1_count += 1;
            $("#upgrade1_button").text("upgrade1 : "+upgrade1_price+" FV");
            return
        }
        upgrade1_count += 1;
        upgrade1_price = parseFloat(
            (3 * Math.pow(1.1, upgrade1_count)).toFixed(0)
        );
        $("#upgrade1_button").text("upgrade1 : "+upgrade1_price+" FV");
        console.log("업그레이드 성공! one_func = " + one_func);
    } else {
        console.log("FV 부족! (현재: " + fv + ")");
    }

}

function updata(){
    $("#fv").text("fv = "+fv);
    $("#equation").text("f(x) = "+one_func+"x");
    $("#v0").text("Scheduled function value = "+equation(max_time));
}

let tick = 1;
let tick_upgrade_count = 0;
let tick_upgrade_price = 10; // 초기 가격
const base_price = 10;       // 시작 가격
const growth_factor = 1.2;   // 매번 1.1배

function tick_upgrade(){
    if (fv >= tick_upgrade_price){
        tick_upgrade_count += 1;
        tick += 0.01;
        tick = parseFloat(tick.toFixed(2));
        fv -= tick_upgrade_price;

        // 업그레이드 가격을 1.1배씩 증가시키기
        tick_upgrade_price = parseFloat(
            (base_price * Math.pow(growth_factor, tick_upgrade_count)).toFixed(0)
        );

        $("#tick_upgrade_button").text("tick upgrade : " + tick_upgrade_price + " FV");
        startCalculateInterval();
    }
}

// setInterval(calculateFV, 100);
startCalculateInterval();
setInterval(updata, 10);