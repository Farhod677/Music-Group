const deleteButtons = document.querySelectorAll('.btn-danger');
const quantityInputs = document.querySelectorAll('.cart-quantity-input');
const addToCartButtons = document.querySelectorAll('.shop-item-button');
const cartItems = document.querySelector('.cart-items');
const buttonPurchase = document.querySelector('.btn-purchase').addEventListener('click', () => {
    alert('Thank you for your purchase');
    while (cartItems.hasChildNodes()) 
        cartItems.removeChild(cartItems.firstChild);

    updateTotalPrice();
});

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', removeItem);
});

quantityInputs.forEach(input => {
    input.addEventListener('change', quantityChanged);
});

addToCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addItem);
});


function addItem(e) {
    const item = e.target.parentElement.parentElement;
    const title = item.querySelector('.shop-item-title').innerText;
    const imageSrc = item.querySelector('.shop-item-image').src;
    const price = item.querySelector('.shop-item-price').innerText;
    addItemToCart(title, price, imageSrc);
    updateTotalPrice();
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = cartItems.querySelectorAll('.cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++)
        if (cartItemNames[i].innerText === title) {
            alert('This item is alredy added to a cart');
            return;
        }

    const cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContent;
    cartItems.appendChild(cartRow);

    cartRow.querySelector('.btn-danger').addEventListener('click', removeItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}


function quantityChanged(e) {
    const input = e.target;
    if (isNaN(input.value) || input.value <= 0)
        input.value = 1;
    updateTotalPrice();
}

function removeItem(e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalPrice();
}

function updateTotalPrice() {
    const cartItemContainer = document.querySelector('.cart-items');
    const cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total = 0;
    cartRows.forEach(cartRow => {
        const priceElement = cartRow.querySelector('.cart-price');
        const quantityElement = cartRow.querySelector('.cart-quantity-input');
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total = total + (price * quantity);
    });
    total = Math.round(total * 100) / 100;
    const cartTotalPrice = document.querySelector('.cart-total-price');
    cartTotalPrice.innerHTML = `$${total}`;
}