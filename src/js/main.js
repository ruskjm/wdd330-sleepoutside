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

// Function to show the banner for first-time visitors
function showRegisterBanner() {
    const isReturningVisitor = localStorage.getItem("isReturningVisitor");
  
    if (!isReturningVisitor) {
      const banner = document.getElementById("registerBanner");
      banner.classList.remove("hidden");
      localStorage.setItem("isReturningVisitor", "true");
    }
  }
  
  function closeBanner() {
    document.getElementById("registerBanner").classList.add("hidden");
  }
  document.addEventListener("DOMContentLoaded", () => {
    showRegisterBanner();
    document.querySelector(".close-banner-button").addEventListener("click", closeBanner);
  });
  