function FoodStore(name, pricem, img, id) {
    this.name = name;
    this.price = pricem;
    this.img = img;
    this.id = id;


}

const foodStore = [
    {
        name: 'Pizza',
        price: 500,
        img: 'https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401?k=20&m=1192094401&s=612x612&w=0&h=jesvXuPyvqM36GQ5QEvJrL3QZjK6YKsziUUF3ZbW0gw=',
        id: 1
    },
    {
        name: 'Burger',
        price: 400,
        img: 'https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282?k=20&m=1206323282&s=612x612&w=0&h=yatlq6BHRCCvoTzFZLSwaJc0O8Quct_tRPWtH0dj9Fc=',
        id: 2

    },
    {
        name: 'Fries',
        price: 300,
        img: 'https://s7d1.scene7.com/is/image/mcdonalds/t-fries-basket:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',
        id: 3
    }
];
let currentId;
let cart = [];

const buildCard = () => {
    foodStore.forEach(item => {
        let food = new FoodStore(item.name, item.price, item.img, item.id);
        document.getElementById('food-list').innerHTML += `
      <div class="col-md-4 animate">
          <div class="card">
           <div class="d-flex justify-content-center">
           <img src="${food.img}" alt="" height="200" width="200" class="i" /></div>
            <div class="card-body">
              <h5 class="card-title">${food.name}</h5>
              <p class="card-text">
                Crusty Palace is a family-owned business that specializes in
                creating delicious, authentic Italian food.
              </p>
              <div class="w-100 d-flex justify-content-between">
                <p class="price">Ksh.${food.price}.00</p>
                <i class="fa fa-shopping-cart" type="button" 
                data-bs-toggle="modal" data-bs-target="#addToCart" 
                onclick="addToModal('${food.id}','${food.name}', '${food.img}')"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
}

const addToModal = (id, name, img) => {
    currentId = id;
    document.getElementById('title').innerText = name;
    document.getElementById('img').setAttribute('src', img)

}

buildCard();

const addToCart = () => {
    const food = foodStore.find(item => item.id == currentId);
    // Get toppings, crust and size
    const toppings = document.querySelector('#toppings').value;
    const crust = document.querySelector('#crust').value;
    const size = document.querySelector('#size').value;
    console.log(food);
    const extrasObject = {
        topping: toppings,
        crust: crust,
        size: size
    };
    const total = priceReducer(extrasObject)
    // Create new object
    const order = {
        ...food
        , ...extrasObject,
        total: total
    };
    cart.push(order);
}

let finalPrice = 0;

const populateOrders = () => {
    let table = document.getElementById('table');
    table.innerHTML = null;
    let prices = [];
    cart.forEach((order) => {
        prices.push(order.total);
        table.innerHTML += `
        <tr>
                <th>${order.id}</th>
                <td>${order.name}</td>
                <td>${order.topping}</td>
                <td>${order.crust}</td>
                <td>${order.size}</td>
                <td>${order.total}</td>
              </tr>
        `
    });
    finalPrice = prices.length > 0 ? prices.reduce((a, b) => a + b) : 0;
    document.getElementById('totalPrice').innerText = finalPrice;
}

const priceReducer = (overload) => {
    let prices = [];
    for (let price in overload) {
        prices.push(parseInt(overload[price]))
    }
    return prices.reduce((a, b) => a + b);
}

const check = () => {
    if (finalPrice > 1) {
        document.getElementById('delivery-form').classList.remove('visually-hidden');
        finalPrice += 200;
        document.getElementById('totalPrice').innerText = finalPrice;
    }
}

const checkout = () => {
    if (finalPrice < 1) {
        alert("Empty Cart");
        return;
    }
    cart = [];
    finalPrice = 0;
    alert("Order Successful")
}

document.getElementById('year').innerText = new Date(Date.now()).getFullYear();