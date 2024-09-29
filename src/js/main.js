import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { setupCartIcon, updateCartIcon } from "./cartIcon.js";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, listElement);

// Initialize the cart icon
setupCartIcon();
updateCartIcon();

productList.init();