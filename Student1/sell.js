//nav bar
const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 0);  
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>  {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');

}

window.onscroll = () =>  {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');

}

//Cart open close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    //Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quatity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]; // Change 'input' to 'button' here
        button.addEventListener("click", addCartClicked);
    }
    
    loadCartItems();
}




//Remove cart Item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItem();
}

// Quantity Change
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItem();
    updateCartIcon ();
}

// Add Cart Function
function addCartClicked(event) {
    var button = event.target; 
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector('.product-tittle').innerText; 
    var price = shopProducts.querySelector('.price').innerText; 
    var productImg = shopProducts.querySelector('.product-img').src; 
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItem();
    updateCartIcon();
    updateCartContainerHeight();
}

// Function to update the cart container height
function updateCartContainerHeight() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = document.querySelectorAll(".cart-box");
    var totalHeight = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        totalHeight += cartBoxes[i].offsetHeight;
    }

    // Set a maximum height for the cart container (adjust this value as needed)
    var maxHeight = 400;

    if (totalHeight > maxHeight) {
        cartContent.style.height = maxHeight + "px";
        cartContent.style.overflowY = "auto";
    } else {
        cartContent.style.height = "auto";
        cartContent.style.overflowY = "visible";
    }
}


// Add a product to the cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItmes = document.getElementsByClassName('cart-content')[0];
    var cartItmesNames = cartItmes.getElementsByClassName('cart-product-title');
    for ( var i = 0; i < cartItmesNames.length; i++){
        if(cartItmesNames[i].innerText == title) {
            alert('You have already added this item to cart');
            return;
        }
    }
    var cartContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="details-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <!--Remove Item-->
    <img src="sdImages/remove-item.png" alt="remove items" class="cart-remove">`;
    
    cartShopBox.innerHTML = cartContent;

    var cartItems = document.querySelector('.cart-content'); // Fix this line
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    saveCartItem();
    updateCartIcon ();
}


// update Total
function updatetotal() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price*quantity;
    }
    // If price contain some cents
    total = Math.round(total*100)/100;
    document.getElementsByClassName('total-price')[0].innerText = '$'+ total;



    // Save Total TO LocalStorage
    localStorage.setItem("cartTotal", total);
}

// Keep item in cart when page refresh with localstorage
function saveCartItem() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItmes = [];

    for (var i=0; i<cartBoxes.length; i++){
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item  = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItmes.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItmes));
}

// Load cart items
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for(var i=0; i<cartItems.length; i++){
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length-1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if(cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
    }
    updateCartIcon ();
    updateCartContainerHeight();
}

// Quantity In cart Icon
function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for (var i= 0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity+= parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}

// Pay Now
var payNowButton = document.querySelector(".btn-buy");
payNowButton.addEventListener("click", function () {
    // Save cart items to LocalStorage before opening the new tab
    saveCartItem();
    updateCartIcon();

    // Open Check Details page in a new tab
    window.open("checkdetails.html", "_blank");
});







