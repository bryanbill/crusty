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
const cart = [];

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
    console.log(name, img, id);
    currentId = id;
    document.getElementById('title').innerText = name;
    document.getElementById('img').setAttribute('src', img)

}

buildCard();

const addToCart = () => {
    console.log(currentId);
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
    console.log(cart);
}


const priceReducer = (overload) => {
    let prices = [];
    for (let price in overload) {
        prices.push(parseInt(overload[price]))
    }
    console.log(prices);
    return prices.reduce((a, b) => a + b);
}
