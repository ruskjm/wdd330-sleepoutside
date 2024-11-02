// Importing the module to fetch data by category
import LocalProductData from "./LocalProductData.mjs";

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log("URL Parameters:", urlParams);
  const category = urlParams.get('category') || 'default-category';
  console.log("Category:", category);

  // Initialize ProductData with the category and fetch data
  const productData = new LocalProductData(category);
  const products = await productData.getData();
  console.log("Products for category " + category + ":", products);

  // Set up search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Search button click event
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    console.log("Search input:", query);

    if (query) {
      // Filter products based on the search query
      const filteredProducts = products.filter(product =>
        product.Name.toLowerCase().includes(query.toLowerCase())
      );

      // Display the filtered products
      displayProducts(filteredProducts);
    } else {
    //clear the display or show a message if the query is empty
      const productListingElement = document.getElementById('searchedProducts');
      productListingElement.innerHTML = '';
    }
  });
}

// Template for displaying a single product card
function productCardTemplate(product) {
  const hasDiscount = product.SuggestedRetailPrice > product.FinalPrice;
  const discount = hasDiscount ? product.SuggestedRetailPrice - product.FinalPrice : "";
  const discountPercent = hasDiscount ? ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100 : "";

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        ${hasDiscount ? `<p class="discount">Discount: $${discount.toFixed(2)} (${discountPercent.toFixed(2)}% off)</p>` : ""}
      </a>
    </li>`;
}

// Function to display products
function displayProducts(products) {
  const productListingElement = document.getElementById('searchedProducts');
  productListingElement.innerHTML = products.map(product => productCardTemplate(product)).join("");
}

// Initializing the script once the DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);
