// Import functions for local storage
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Import ProductData class for handling product information
import ProductData from "./ProductData.mjs";

// Create a new instance of ProductData for tents
const dataSource = new ProductData("tents");

// Function to add a product to the cart
function addProductToCart(product) {
  // Retrieve the current cart from local storage
  let cart = getLocalStorage("so-cart");

  // Check if cart is an array, if not, initialize it as an empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", cart);
}

// Asynchronous event handler for the "Add to Cart" button
async function addToCartHandler(e) {
  // Find the product by its ID
  const product = await dataSource.findProductById(e.target.dataset.id);
  // Add the found product to the cart
  addProductToCart(product);
}

// Select the "Add to Cart" button
document
  .getElementById("addToCart")
  // Add a click event listener to the button
  .addEventListener("click", addToCartHandler);

  filterProducts(list) {
    // The IDs of the first four tents in the list
    const desiredIds = [
        "880RR",
        "985RF",
        "989CG",
        "985PR"
    ];

    return list.filter(item => desiredIds.includes(item.Id));
}
