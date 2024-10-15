// Render function to update the cart contents on the page
import { getLocalStorage } from "./utils.mjs";
import { setupCartIcon, updateCartIcon } from "./cartIcon.js";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  //const productList = document.querySelector(".product-list");
  const checkoutFooter = document.querySelector(".checkout-footer");
  const cartTotal = document.querySelector(".sub-total");
  const orderTotalElement = document.querySelector(".order-total");
  const shippingEstimate = document.querySelector(".shipping-estimate")
  const taxElement = document.querySelector(".tax")
  const taxRate = 0.06

  if (cartItems.length === 0) {
    //productList.innerHTML = "<li>Your cart is empty</li>";
    checkoutFooter.classList.add("hide");
  } else {
    // Tracking unique items and their quantities
    const specialItems = [];
    const productIds = new Set();

    // Loop through cartItems to populate specialItems with unique products and their quantities
    cartItems.forEach((item) => {
      if (!productIds.has(item.Id)) {
        productIds.add(item.Id);
        const quantity = cartItems.filter(
          (citem) => citem.Id === item.Id,
        ).length;
        // Calculate total price for the item
        const totalPrice = item.FinalPrice * quantity;
        specialItems.push({ ...item, quantity, totalPrice });
      }
    });

    // Calculate and display the total price for the cart
    const totalCartPrice = specialItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    cartTotal.innerHTML = `Sub Total: $${totalCartPrice.toFixed(2)}`;
    checkoutFooter.classList.remove("hide");

    const taxAmount = taxRate*totalCartPrice
    taxElement.innerHTML = `Tax Amount: $${taxAmount.toFixed(2)}`
    let shipping = 10 + 2*(cartItems.length -1);
    let orderTotal = shipping + totalCartPrice + taxAmount

    shippingEstimate.innerHTML = `Shipping $${shipping.toFixed(2)}`
    orderTotalElement.innerHTML = `Order Total: $${orderTotal.toFixed(2)}`

  }
  updateCartIcon();
}

// Initialize the cart icon and render cart contents
setupCartIcon();
renderCartContents();
loadHeaderFooter();