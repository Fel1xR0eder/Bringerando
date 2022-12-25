let foods = ["Rote Beete Salat", "Salat der Saison", "Pinsa Pfifferling", "Pinsa Tofu", "Bowl der Wahl", "Bowl der Saison", "Kuchen", "Creme Brûlée"];
let descriptions = ["Rote Beete, Kopfsalat, Karotte, Staudensellerie, Sesam, Dressing",
    "Regionales Gemüse zur saisonalen Zeit", "Pfifferlinge, Ruccola, Mozzarella",
    "Tofu, Spinat, Paprika, Mozzarella", "Falafel, rote Beete, Hummus, Kopfsalat, Spinat",
    "Regionales Gemüse zur saisonalen Zeit", "Täglich frischer, wechselnder Kuchen",
    "Veganer Vanillepudding mit karamelisiertem Rohrzucker"];
let prices = [6.50, 7.50, 8.00, 8.00, 9.00, 9.50, 3.50, 4.00];
let amounts = [];
let basketFood = [];
let basketPrice = [];
let delivery = 3.50.toFixed(2).replace('.', ',');
let basketButton = true;


function onLoad() {
    renderBasket();
    loadAll();
}

function renderBasket() {
    let basket = document.getElementById('basket');

    if (basketFood.length <= 0) {
        basket.innerHTML = `
        <p>Hier wird ihre aufgegebene Bestellung angezeigt! <br>
            Die Mindestbestellmenge beträgt 15 Euro. Für die lieferung
            berechnen wir 3,50 Euro extra.
        </p>`;
    } else {
        displayBasket();
    }
}

function loadAll() {

    let home = document.getElementById('content');
    home.innerHTML = '';

    for (let i = 0; i < foods.length; i++) {
        const price = prices[i];
        const formattedPrice = price.toFixed(2);

        home.innerHTML += `
        <div>
            <div class="food-selection">

                <div class="addFood">
                    <h3 id="category">${foods[i]}</h3>
                    <button onclick="addToArray(${i})" class="add">+</button>
                </div>
                <p>${descriptions[i]}</p>
                <h4>${formattedPrice} € </h4>
            </div>
        </div>
        `;

    }
}

function addToArray(i) {
    let index = basketFood.indexOf(foods[i]);

    if (index == -1) {
        basketFood.push(foods[i]);
        basketPrice.push(prices[i]);
        amounts.push(1);
    } else {
        amounts[index]++;
    }
    renderBasket();
    mobileBasketButton();
}

function displayBasket() {
    let basketContent = document.getElementById('basket');
    basketContent.innerHTML = '';

    for (let i = 0; i < basketPrice.length; i++) {
        sum = 0;
        let dish = basketFood[i];
        let amount = amounts[i];
        sum += basketPrice[i] * amount;

        basketContent.innerHTML += htmlBasket(amounts, dish, sum, i);
    }

    updateShoppingBasket();
    //calculateMobileBasket();
}

function updateShoppingBasket(finalSum) {
    let basketContent = document.getElementById('basket');
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
        let price = basketPrice[i];
        let amount = amounts[i];

        sum += (price * amount);
    }
    finalSum = sum + 3.50;

    basketContent.innerHTML += checkCalc(sum, finalSum);
}

function htmlBasket(amounts, basketFood, sum, i) {
    return `<div id="shop-cart${i}">
    <div class="upperCart" id="upperCart${i}">
        <div class="basketDiv"><span>${amounts[i]} x ${basketFood}</span></div>
        <div class="basketDiv"><span>${sum.toFixed(2).replace('.', ',')}€ </span></div>      <!--toFixed(2)-->
    </div>
    <div id="lowerCart${i}" class="lowerCart">
        <div class="basketDiv">
            <button onclick="decreaseFood(${i})" id="minus"> - </button>
        </div>
        <div class="basketDiv">
            <button onclick="increaseFood(${i})" id="plus"> + </button>
        </div>
        <div class="basketDiv">
            <img id="trash${i}" onclick="removeFood()" src="./img/trash.png">
        </div>
    </div>

    
  </div>`;
}

function removeFood(i) {

    basketFood.splice(i, 1);
    basketPrice.splice(i, 1);
    amounts.splice(i, 1);
    renderBasket();
}

function decreaseFood(i) {

    if (amounts[i] > 1) {
        amounts[i]--;
    } else {
        basketFood.splice(i, 1);
        basketPrice.splice(i, 1);
        amounts.splice(i, 1);
    }
    renderBasket();
}

function increaseFood(i) {
    if (amounts[i] >= 1) {
        amounts[i]++;
    }
    renderBasket();
}

function checkCalc(sum, finalSum) {
    return `
    <div class="basketSum" id="basketSum">
    <div class="basket-left">
       <span> 
            Zwischensumme:  <br>
            Lieferkosten:   <br>
            <b>Gesamtkosten:</b>   <br> 
        </span>
    </div>
    <div class="basket-right">
           <span>${sum.toFixed(2).replace('.', ',')}€ <br>
            ${delivery} € <br>
            <b> ${finalSum.toFixed(2).replace('.', ',')} € </b> <br> </span>
        </div>  
    </div>
    
    <div>
        <button onclick="order()" class="orderButton"> Bestellung abschließen </button> 
    </div>`
}

function order() {
    alert('Good choice :)');
    noOverlay();
}

function noOverlay() {
    document.getElementById('basket').classList.add('hide-display');
}

function reload() {
    location.reload()
}

function mobileBasketButton() {
    if (basketButton == true) {
        if (window.innerWidth <= 800) {

            document.getElementById('content').innerHTML += `
            <button onclick="showMobileBasket()" class="mobile-order">
            Bestellung abschließen
        </button> `;
        }
    }
    basketButton = false;
}   

function showMobileBasket() {
    let basket = document.getElementById('headbasket');
    basket.classList.add('overlay-menu');
}