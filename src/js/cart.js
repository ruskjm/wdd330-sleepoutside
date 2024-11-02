// Render function to update the cart contents on the page
import { getLocalStorage } from "./utils.mjs";
import { setupCartIcon, updateCartIcon } from "./cartIcon.js";

function cartItemTemplate(item, quantity) {
  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    ${quantity >= 1 ? `<p class="cart-card__quantity">${quantity} Tents.</p>` : ""}
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button">Remove</button>
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
    const specialItems = [];
    const productIds = new Set();

    cartItems.forEach((item) => {
      if (!productIds.has(item.Id)) {
        productIds.add(item.Id);
        const quantity = cartItems.filter(
          (citem) => citem.Id === item.Id,
        ).length;

        const totalPrice = item.FinalPrice * quantity;
        specialItems.push({ ...item, quantity, totalPrice });
      }
    });

    const htmlItems = specialItems.map((sitem) =>
      cartItemTemplate(sitem, sitem.quantity),
    );
    productList.innerHTML = htmlItems.join("");
    const totalCartPrice = specialItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    cartTotal.innerHTML = `Total: $${totalCartPrice.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
  updateCartIcon();

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.closest('.cart-card').dataset.id;
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  
  const itemIndex = cartItems.findIndex(item => item.Id === itemId);
  
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    localStorage.setItem("so-cart", JSON.stringify(cartItems)); 
  }

  renderCartContents(); 
}

setupCartIcon();
renderCartContents();
