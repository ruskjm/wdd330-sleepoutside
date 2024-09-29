import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setupCartIcon, updateCartIcon } from "./cartIcon.js";

const dataSource = new ProductData("tents");
const productId = getParams("product");

// Initialize the cart icon
setupCartIcon();
updateCartIcon();

function renderError(message) {
  document.querySelector(".product-detail").innerHTML = `
    <h2>Error</h2>
    <p>${message}</p>
  `;
}

async function productInit() {
  try {
    if (!productId) {
      throw new Error("No product ID specified");
    }
    const productDetails = new ProductDetails(productId, dataSource);
    await productDetails.init();
  } catch (error) {
    renderError(error.message);
  }
}

productInit();
