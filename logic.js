let fv = 0;               // 총 얻은 값
let max_time = 10;        // 10초 주기
let current_time = 0;     // 현재 시간
let x = 0;                // 현재 함수값

let one_func = 0.1;       // 1차함수 계수

function equation(t) {
    return parseFloat((one_func * t).toFixed(1));
}

function calculateFV() {
    if (current_time < max_time) {
        x = equation(current_time);
        console.log("t=" + current_time + " | x=" + x);
        current_time += 0.1;
        current_time = parseFloat(current_time.toFixed(1));
    } else {
        let will_return = equation(max_time);
        fv += will_return;
        console.log("▶ 주기 완료! +" + will_return + " FV 획득 (총합: " + fv + ")");
        current_time = 0;
        x = 0;
    }
}

function upgrade1(){
    if (fv >= 10) {
        one_func += 0.1;
        one_func = parseFloat(one_func.toFixed(1));
        fv -= 10;
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


setInterval(calculateFV, 100);
setInterval(updata, 10);