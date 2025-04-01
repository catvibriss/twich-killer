function toggleMenu() {
    let nav = document.querySelector("nav");
    nav.classList.toggle("active");
}


document.addEventListener("DOMContentLoaded", function () {
    startGameLoop();
    // updateBalanceDisplay();
});


let betAmount = 0;
let isSpinning = false;

function startGameLoop() {
    let timerElement = document.getElementById("timer");
    let timeLeft = 10;

    let countdown = setInterval(() => {
        if (!isSpinning) {
            timeLeft--;
            timerElement.innerText = timeLeft;
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            spinArrow();
        }
    }, 1000);
}

function spinArrow() {
    debugger;
    balance = 2000;
    if (betAmount > balance || betAmount < 0) {
        alert("Введите корректную ставку!");
        betAmount = 0;
        return;
    }

    isSpinning = true;
    let timerElement = document.getElementById("timer");
    timerElement.innerText = "0"; // Останавливаем таймер

    setTimeout(() => {
        alert(`Выпал множитель: ${selectedSector.multiplier}`);

        // Вычисление выигрыша
        let multiplierValue = parseInt(selectedSector.multiplier.replace("x", ""));
        let winnings = betAmount * multiplierValue;

        balance += winnings - betAmount; // Обновление баланса
        betAmount = 0; // Сброс ставки

        //    updateBalanceDisplay();

        // Возвращаем стрелку в начальную позицию (0 градусов)
        arrow.style.transition = "none";
        arrow.style.transform = "rotate(0deg)";

        isSpinning = false;
        startGameLoop(); // Запускаем новый цикл после остановки стрелки
    }, 3100);
}


function setBet(amount) {
   if (amount === "all") {
       betAmount = balance;
   } else {
       if (betAmount + amount > balance) {
           betAmount = balance;
       } else {
           betAmount += amount;
       }
   }
   updateBalanceDisplay();
}

function adjustBet(action) {
   if (action === "half") {
       betAmount = Math.floor(betAmount / 2);
   } else if (action === "double") {
       if (betAmount * 2 > balance) {
           betAmount = balance;
       } else {
           betAmount *= 2;
       }
   }
   updateBalanceDisplay();
}

var intervalID = window.setInterval(interval, 1000);

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                let obj = JSON.parse(xmlhttp.responseText);
                console.log(obj["out"])
            }
            else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "/crash_get", true);
    xmlhttp.send();
}

function interval() {
    loadXMLDoc();
}