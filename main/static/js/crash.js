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

let caef = 0;

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
    balance = 2000;
    if (betAmount > balance || betAmount < 0) {
        alert("Введите корректную ставку!");
        betAmount = 0;
        return;
    }
    document.getElementById("targetMultiplier").value = `${caef}`;
    isSpinning = true;
    let timerElement = document.getElementById("timer");
    timerElement.innerText = "0"; // Останавливаем таймер
    console.log(caef);

    // setTimeout(() => {
    //     alert(`Выпал множитель: ${selectedSector.multiplier}`);

    //     // Вычисление выигрыша
    //     let multiplierValue = parseInt(selectedSector.multiplier.replace("x", ""));
    //     let winnings = betAmount * multiplierValue;

    //     balance += winnings - betAmount; // Обновление баланса
    //     betAmount = 0; // Сброс ставки

    //     //    updateBalanceDisplay();

    //     // Возвращаем стрелку в начальную позицию (0 градусов)
    //     arrow.style.transition = "none";
    //     arrow.style.transform = "rotate(0deg)";

    //     isSpinning = false;
    //     startGameLoop(); // Запускаем новый цикл после остановки стрелки
    // }, 3100);
    startGame();
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
                caef = obj["out"];
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

// Код для Crash игры
const multiplierDisplay = document.getElementById('multiplier');
const chart = document.getElementById('chart');
const crashLine = document.getElementById('crashLine');
const minMultiplierDisplay = document.getElementById('minMultiplier');
const targetMultiplierInput = document.getElementById('targetMultiplier');
const startButton = document.getElementById('startButton');
const cashoutButton = document.getElementById('cashoutButton');

const MAX_COLUMNS = 5;
const COLUMN_WIDTH = 40;
const COLUMN_SPACING = 10;
const BASE_SPEED = 1;
const CANDLE_HEIGHT_MULTIPLIER = 2;

let currentMultiplier = 1.00;
let targetMultiplier = 0.37;
let crashed = false;
let cashingOut = false;
let candleInterval;
let multiplierInterval;
let candleColumns = [];
let currentCandle = {
    open: 1.00,
    high: 1.00,
    low: 1.00,
    close: 1.00
};
let minMultiplier = 1.00;
let speedMultiplier = 1;
let animationSpeed = BASE_SPEED;

function createCandle(candleData) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    
    const isRed = candleData.close <= candleData.open;
    const bodyHeight = Math.abs(candleData.close - candleData.open) * 100 * CANDLE_HEIGHT_MULTIPLIER;
    const maxVal = Math.max(candleData.open, candleData.close);
    const wickTopHeight = (candleData.high - maxVal) * 100 * CANDLE_HEIGHT_MULTIPLIER;
    const wickBottomHeight = (Math.min(candleData.open, candleData.close) - candleData.low) * 100 * CANDLE_HEIGHT_MULTIPLIER;
    
    candle.innerHTML = `
        <div class="candle-wick" style="height: ${wickTopHeight}px; margin-bottom: ${(1 - maxVal) * 100 * CANDLE_HEIGHT_MULTIPLIER}%;"></div>
        <div class="candle-body" style="height: ${bodyHeight}px; background-color: ${isRed ? '#F44336' : '#4CAF50'};"></div>
        <div class="candle-wick" style="height: ${wickBottomHeight}px;"></div>
    `;
    
    return candle;
}

function updateChart() {
    if (candleColumns.length > MAX_COLUMNS) {
        const removedColumn = candleColumns.shift();
        if (removedColumn.element && removedColumn.element.parentNode) {
            removedColumn.element.remove();
        }
    }
    
    candleColumns.forEach((column, index) => {
        const xPos = (index * (COLUMN_WIDTH + COLUMN_SPACING)) + 20;
        column.element.style.left = `${xPos}px`;
        
        const translateY = (candleColumns.length - 1 - index) * 15 * animationSpeed;
        column.element.style.transform = `translateY(${translateY}px)`;
        
        const opacity = 1 - (candleColumns.length - 1 - index) * 0.2;
        column.element.style.opacity = Math.max(0, opacity).toString();
    });

    minMultiplier = Math.min(minMultiplier, currentMultiplier);
    minMultiplierDisplay.textContent = minMultiplier.toFixed(2);
}

function startGame() {
    currentMultiplier = 1.00;
    minMultiplier = 1.00;
    crashed = false;
    cashingOut = false;
    candleColumns = [];
    currentCandle = {
        open: 1.00,
        high: 1.00,
        low: 1.00,
        close: 1.00
    };
    speedMultiplier = 1;
    animationSpeed = BASE_SPEED;
    
    document.querySelectorAll('.candle-column').forEach(col => col.remove());
    
    targetMultiplier = parseFloat(targetMultiplierInput.value) || 0.37;
    if (targetMultiplier > 0.99) targetMultiplier = 0.99;
    if (targetMultiplier < 0.01) targetMultiplier = 0.01;
    
    crashLine.style.display = 'block';
    crashLine.style.top = `${(1 - targetMultiplier) * 100}%`;
    
    startButton.disabled = true;
    cashoutButton.disabled = false;
    
    multiplierDisplay.textContent = '1.00x';
    multiplierDisplay.style.color = '#F44336';
    
    createNewColumn();
    
    candleInterval = setInterval(updateCandle, 500 / speedMultiplier);
    multiplierInterval = setInterval(updateMultiplier, 50 / speedMultiplier);
}

function createNewColumn() {
    const column = document.createElement('div');
    column.className = 'candle-column';
    chart.appendChild(column);
    
    candleColumns.push({
        element: column,
        candles: []
    });
}

function updateCandle() {
    if (crashed || cashingOut) return;
    
    if (candleColumns.length === 0 || 
        candleColumns[candleColumns.length-1].candles.length >= 1) {
        createNewColumn();
    }
    
    const currentColumn = candleColumns[candleColumns.length-1];
    currentCandle.close = currentMultiplier;
    
    const candleElement = createCandle(currentCandle);
    currentColumn.element.appendChild(candleElement);
    currentColumn.candles.push({...currentCandle});
    
    currentCandle = {
        open: currentMultiplier,
        high: currentMultiplier,
        low: currentMultiplier,
        close: currentMultiplier
    };
    
    updateChart();
    
    if (currentMultiplier < 0.3 && speedMultiplier === 1) {
        speedMultiplier = 2;
        animationSpeed = BASE_SPEED * 2;
        clearInterval(candleInterval);
        clearInterval(multiplierInterval);
        candleInterval = setInterval(updateCandle, 500 / speedMultiplier);
        multiplierInterval = setInterval(updateMultiplier, 50 / speedMultiplier);
    }
}

function updateMultiplier() {
    if (crashed || cashingOut) return;
    
    currentMultiplier -= 0.01 * speedMultiplier;
    
    currentCandle.high = Math.max(currentCandle.high, currentMultiplier);
    currentCandle.low = Math.min(currentCandle.low, currentMultiplier);
    currentCandle.close = currentMultiplier;
    
    if (currentMultiplier <= targetMultiplier) {
        crashGame();
        return;
    }
    
    multiplierDisplay.textContent = currentMultiplier.toFixed(2) + 'x';
    
    if (currentMultiplier < 0.5) {
        multiplierDisplay.style.color = '#FF9800';
    } else if (currentMultiplier < 0.7) {
        multiplierDisplay.style.color = '#FFC107';
    }
}

function crashGame() {
    crashed = true;
    clearInterval(candleInterval);
    clearInterval(multiplierInterval);
    
    currentMultiplier = targetMultiplier;
    multiplierDisplay.textContent = currentMultiplier.toFixed(2) + 'x';
    multiplierDisplay.style.color = '#4CAF50';
    
    currentCandle.close = currentMultiplier;
    if (candleColumns.length > 0) {
        const currentColumn = candleColumns[candleColumns.length-1];
        const candleElement = createCandle(currentCandle);
        currentColumn.element.appendChild(candleElement);
        currentColumn.candles.push({...currentCandle});
    }
    
    updateChart();
    
    startButton.disabled = false;
    cashoutButton.disabled = true;
}

function cashout() {
    if (crashed || cashingOut) return;
    
    cashingOut = true;
    clearInterval(multiplierInterval);
    cashoutButton.disabled = true;
    startButton.disabled = false;
    
    multiplierDisplay.style.color = '#FFC107';
    
    currentCandle.close = currentMultiplier;
    if (candleColumns.length > 0) {
        const currentColumn = candleColumns[candleColumns.length-1];
        const candleElement = createCandle(currentCandle);
        currentColumn.element.appendChild(candleElement);
        currentColumn.candles.push({...currentCandle});
    }
    
    updateChart();
}

startButton.addEventListener('click', startGame);
cashoutButton.addEventListener('click', cashout);

multiplierDisplay.textContent = '1.00x';
crashLine.style.top = '100%';






// let xhr = new XMLHttpRequest();

// let url = `/money_add/?amount=${aba}`;

// xhr.open("GET", url);

// xhr.send();

// xhr.onload = () => console.log(xhr.responseText);