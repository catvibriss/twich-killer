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
    balance = 2000;
    if (betAmount > balance || betAmount < 0) {
        alert("Введите корректную ставку!");
        betAmount = 0;
        return;
    }

    isSpinning = true;
    let timerElement = document.getElementById("timer");
    timerElement.innerText = "0"; // Останавливаем таймер

    let arrow = document.querySelector(".roulette-wheel");


    // Разбиение множителей на диапазоны градусов
    let sectors = [
        { range: [0, 15], multiplier: "x3" }, { range: [15, 30], multiplier: "x2" },
        { range: [30, 45], multiplier: "x3" }, { range: [45, 60], multiplier: "x5" },
        { range: [60, 75], multiplier: "x20" }, { range: [75, 90], multiplier: "x2" },
        { range: [90, 105], multiplier: "x3" }, { range: [105, 120], multiplier: "x2" },
        { range: [120, 135], multiplier: "x5" }, { range: [135, 150], multiplier: "x2" },
        { range: [150, 165], multiplier: "x3" }, { range: [165, 180], multiplier: "x2" },
        { range: [180, 195], multiplier: "x3" }, { range: [195, 210], multiplier: "x2" },
        { range: [210, 225], multiplier: "x5" }, { range: [225, 240], multiplier: "x2" },
        { range: [240, 255], multiplier: "x3" }, { range: [255, 270], multiplier: "x2" },
        { range: [270, 285], multiplier: "x3" }, { range: [285, 300], multiplier: "x2" },
        { range: [300, 315], multiplier: "x5" }, { range: [315, 330], multiplier: "x2" },
        { range: [330, 345], multiplier: "x3" }, { range: [345, 360], multiplier: "x2" },

    ];

   // Выбор случайного сектора
   let selectedSector = sectors[Math.floor(Math.random() * sectors.length)];
   let randomAngle = getRandomAngleInRange(selectedSector.range);

   let finalRotation = 1440 + randomAngle; // 1440 = 4 полных оборота + угол сектора

   // Устанавливаем начальную позицию перед вращением
   arrow.style.transition = "none";
   arrow.style.transform = "rotate(0deg)";

   setTimeout(() => {
       arrow.style.transition = "transform 3s ease-out";
       arrow.style.transform = `rotate(${finalRotation}deg)`;
   }, 50); // Небольшая задержка, чтобы сброс угла сработал

   setTimeout(() => {
       alert(`Выпал множитель: ${selectedSector.multiplier}`);
       debugger;
       if (document.querySelector(".multiplier-grid").children[selected].innerText == selectedSector.multiplier) {
        if (selected == 0) {
            let aba = parseInt(document.querySelector("#bet-amount").value)/2*-1;
            // TODO: ajax reduce
            let xhr = new XMLHttpRequest();

let url = `/money_add/?amount=${aba}`;

xhr.open("GET", url);

xhr.send();

xhr.onload = () => console.log(xhr.responseText);
    }

         else if (selected == 1){

            let aba = parseInt(document.querySelector("#bet-amount").value)/3*-1;
            
            // TODO: ajax
            let xhr = new XMLHttpRequest();

let url = `/money_add/?amount=${aba}`;

xhr.open("GET", url);

xhr.send();

xhr.onload = () => console.log(xhr.responseText);
        } else if (
            selected == 2
        ){ 
            let aba = parseInt(document.querySelector("#bet-amount").value)/5*-1;
            
            // TODO: ajax
            let xhr = new XMLHttpRequest();

let url = `/money_add/?amount=${aba}`;

xhr.open("GET", url);

xhr.send();

xhr.onload = () => console.log(xhr.responseText);
        } else if (
            selected == 3
        ) { 
            
            let aba = parseInt(document.querySelector("#bet-amount").value)/20*-1;
            // TODO: ajax
            let xhr = new XMLHttpRequest();

let url = `/money_add/?amount=${aba}`;

xhr.open("GET", url);

xhr.send();

xhr.onload = () => console.log(xhr.responseText);
        }
        for  (let index = 0; index < 100; index++) {
            let i = document.createElement("img");
            i.src = "/static/img/particle.png"
            let delay = 2000+(index*10)
            i.style.position = "absolute"
            let ab = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            let ab2 = Math.floor(Math.random() * (360 - 0 + 1) + 0);
            i.style.transform = `rotate(${ab2}deg)`
            i.style.animationDelay = `${delay}ms`
            i.style.transitionDelay = `${delay}ms`
            if (ab == 0) {

            i.className = "bab";
            i.style.animationName = "beb1"
        } else {
            i.className = "bab2";

            i.style.animationName = "beb2"
        }
            document.querySelector("body").appendChild(i);
        }
       } else {
        // TODO: ajax +(number) to the account
        let xhr = new XMLHttpRequest();
        let aba = parseInt(document.querySelector("#bet-amount").value);
let url = `/money_add/?amount=${aba}`;

xhr.open("GET", url);

xhr.send();

xhr.onload = () => console.log(xhr.responseText);
       }

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

// Функция выбора случайного угла в пределах диапазона множителя
function getRandomAngleInRange(range) {
   return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
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


let selectedMethod = "";
let promoApplied = false;
let bonusRate = 0.05; // 5% бонус

// Функция выбора метода пополнения или вывода
function selectPaymentMethod(method) {
    selectedMethod = method;

    // Убираем активный класс у всех кнопок
    const buttons = document.querySelectorAll('.payment-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Добавляем активный класс к выбранной кнопке
    document.getElementById(method).classList.add('active');
    
    console.log(`Выбран способ пополнения/вывода: ${method}`);
}

// Функция расчёта итоговой суммы с бонусом
function calculateFinalAmount() {
    let depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    let withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    let finalAmount = depositAmount || withdrawAmount;

    // Добавляем бонус, если промокод принят
    if (promoApplied && depositAmount > 0) {
        finalAmount += depositAmount * bonusRate; // Добавляем бонус
    }

    document.getElementById("final-amount").innerText = finalAmount.toFixed(2) + "₽";
}

// Функция для применения промокода
function applyPromoCode() {
    let promoCode = document.getElementById("promo-code").value.trim();

    if (promoCode === "GHOSTCASINO5") {
        promoApplied = true;
        alert("Промокод принят! Бонус +5% на пополнение.");
        calculateFinalAmount();
    } else {
        promoApplied = false;
        alert("Неверный промокод.");
        calculateFinalAmount();  // Пересчитываем сумму без бонуса
    }
}

// Подтверждение пополнения
function confirmDeposit() {
    let depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Введите корректную сумму!");
        return;
    }

    if (!selectedMethod) {
        alert("Выберите способ пополнения!");
        return;
    }

    alert(`Пополнение на ${depositAmount}₽ через ${selectedMethod}. С учётом бонуса, итоговая сумма: ${(depositAmount * (1 + (promoApplied ? bonusRate : 0))).toFixed(2)}₽`);
}

// Подтверждение вывода
function confirmWithdraw() {
    let withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Введите корректную сумму!");
        return;
    }

    if (!selectedMethod) {
        alert("Выберите способ вывода!");
        return;
    }

    alert(`Вывод на ${withdrawAmount}₽ через ${selectedMethod}`);
}

// Функция переключения вкладок (пополнение / вывод)
function toggleTab(tab) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-content').forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // Показать выбранную вкладку
    document.getElementById(tab).classList.add('active');

    // Изменить активную кнопку
    document.querySelectorAll('.submenu-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`.submenu-btn[onclick="toggleTab('${tab}')"]`).classList.add('active');
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

    xmlhttp.open("GET", "/roulette_get", true);
    xmlhttp.send();
}

function interval() {
    loadXMLDoc();
}

var selected = 0;

function startSpin(n, element) {
    let actual = (n/20) - 1;
    selected = actual;
    let parent = element.parentElement;
    for (let asdjjasdlkj = 0; asdjjasdlkj < parent.children.length; asdjjasdlkj++) {
        const element = parent.children[asdjjasdlkj];
        if (asdjjasdlkj != actual) {
            element.style.display = "none";
        }
    }
}