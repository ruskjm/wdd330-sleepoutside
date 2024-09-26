// import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");
// const productId = getParams("product");

// function addProductToCart(product) {
//   let cart = getLocalStorage("so-cart");
//   if (!Array.isArray(cart)) {
//     cart = [];
//   }
//   cart.push(product);
//   setLocalStorage("so-cart", cart);
// }

// function renderProductDetails(product) {
//   document.querySelector(".product-detail").innerHTML = `
//     <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//       ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div>
//   `;
// }

// function renderError(message) {
//   document.querySelector(".product-detail").innerHTML = `
//     <h2>Error</h2>
//     <p>${message}</p>
//   `;
// }

// async function productInit() {
//   try {
//     if (!productId) {
//       throw new Error("No product ID specified");
//     }
//     const product = await dataSource.findProductById(productId);
//     if (!product) {
//       throw new Error(`No product found with ID: ${productId}`);
//     }
//     renderProductDetails(product);

//     document.getElementById("addToCart").addEventListener("click", () => {
//       addProductToCart(product);
//     });
//   } catch (error) {
//     renderError(error.message);
//   }
// }

// productInit();

import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

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