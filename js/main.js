const foodStore = [
    {
        name: 'Pizza',
        price: 500,
        img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        id: 1
    },
    {
        name: 'Burger',
        price: 400,
        img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        id: 2

    },
    {
        name: 'Fries',
        price: 300,
        img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        id: 3
    }
];
let currentId;
let cart = [];

const buildCard = () => {
    foodStore.forEach(item => {
        document.getElementById('food-list').innerHTML += `
      <div class="col-md-4 animate">
          <div class="card">
            <img src="${item.img}" alt="" class="card-img-top img-fluid rotate" />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">
                Crusty Palace is a family-owned business that specializes in
                creating delicious, authentic Italian food.
              </p>
              <div class="w-100 d-flex justify-content-between">
                <p class="price">Ksh.${item.price}.00</p>
                <i class="fa fa-shopping-cart" type="button" 
                data-bs-toggle="modal" data-bs-target="#addToCart" 
                onclick="addToModal('${item.id}','${item.name}', '${item.img}')"></i>
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
    if (finalPrice > 1 ) {
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