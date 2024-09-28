/*

i kept your code here so i dont break it just.


import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";
    cartFooter.classList.add("hide");
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
    
    // Calculate and display the total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : 'N/A'}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();*/
// Render function to update the cart contents on the page
import { getLocalStorage } from "./utils.mjs";

// Template function for cart items
function cartItemTemplate(item, quantity) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    ${quantity >= 1 ? `<p class="cart-card__quantity">${quantity} Tents.</p>` : ""}
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";
    cartFooter.classList.add("hide");
  } else {
    // Tracking unique items and their quantities
    const specialItems = [];
    const productIds = new Set();

    // Loop through cartItems to populate specialItems with unique products and their quantities
    cartItems.forEach(item => {
      if (!productIds.has(item.Id)) {
        productIds.add(item.Id);
        const quantity = cartItems.filter(citem => citem.Id === item.Id).length;
        // Calculate total price for the item
        const totalPrice = item.FinalPrice * quantity;
        specialItems.push({ ...item, quantity, totalPrice });
      }
    });

    // Mapping over specialItems to generate HTML for each unique item
    const htmlItems = specialItems.map((sitem) => cartItemTemplate(sitem, sitem.quantity));
    productList.innerHTML = htmlItems.join("");

    // Calculate and display the total price for the cart
    const totalCartPrice = specialItems.reduce((sum, item) => sum + item.totalPrice, 0);
    cartTotal.innerHTML = `Total: $${totalCartPrice.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
}

renderCartContents();
