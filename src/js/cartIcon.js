import { getLocalStorage } from "./utils.mjs";

export function setupCartIcon() {
  const style = document.createElement("style");
  style.textContent = `
    .cart {
      position: relative;
    }
    .cart[data-items]:not([data-items="0"])::after {
      content: attr(data-items);
      position: absolute;
      top: 0.5em;
      right: -0.5em;
      background-color: red;
      color: white;
      font-size: 0.8em;
      padding: 0.2em 0.4em;
      border-radius: 50%;
      min-width: 1em;
      height: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
}

export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const backpackIcon = document.querySelector(".cart");
  if (backpackIcon) {
    backpackIcon.setAttribute("data-items", cartItems.length.toString());
  }
}