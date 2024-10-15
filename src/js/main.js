//import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
import { setupCartIcon, updateCartIcon } from "./cartIcon.js";
import { loadHeaderFooter } from "./utils.mjs";

//const dataSource = new ProductData("tents");
//const listElement = document.querySelector(".product-list");
//const productList = new ProductList("Tents", dataSource, listElement);

//load header and footer

loadHeaderFooter()

// Initialize the cart icon
setupCartIcon();
updateCartIcon();

//productList.init();