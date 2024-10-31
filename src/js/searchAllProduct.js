// Importing the module to fetch data by category
import LocalProductData from "./LocalProductData.mjs";

async function init() {
  // Retrieve the category from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'default-category';

  // Initialize LocalProductData with the category
  const productData = new LocalProductData(category);
  const products = await productData.getlocalData();
  console.log("this is the returned products according the " + category +" ", products)

  // Display all products initially
  displayProducts(products);

  // Set up search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Search button click event
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    console.log("this is the input word", query)
    if (query) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts);
    } else {
      return "no such products"; // Show all products if search is cleared
    }
  });
}

// Function to display products in the DOM
function displayProducts(products) {
  const productListingElement = document.getElementById('product-listing');
  productListingElement.innerHTML = ''; // Clear previous contents
  products.forEach(product => {
    const productElement = document.createElement('li');
    productElement.className = 'product-item';
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>${product.description}</p>
    `;
    productListingElement.appendChild(productElement);
  });
}

window.addEventListener('DOMContentLoaded', init);
