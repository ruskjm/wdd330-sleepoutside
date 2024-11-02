// Render function to update the cart contents on the page
const baseURL = 'https://wdd330-backend.onrender.com:3000/';
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
  async function convertToJson(res) {
    if(!res.ok){
      console.log("response is not is affected", res.status())
    }else{
      return await res.json()
    }    
  }

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
  // listening for click on the button
  document.querySelector("#submit-button").addEventListener("click", (e) => {
  e.preventDefault();

    function packageItems() {
      const itemsObject = JSON.parse(localStorage.getItem("so-cart"))
      console.log(itemsObject)
      const simplifiedItems = itemsObject.map((item) => {
        
        return {
          id: item.Id,
          price: item.FinalPrice,
          name: item.Name,
          quantity: 1,
        };
      });
      console.log(simplifiedItems);
      return simplifiedItems;
    }
  
  function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }

  async function calculatedDetails(tax, shipping, orderTotal, packageItems)
  {
    const formInfo = document.forms["checkout"]
    const jsonForm = formDataToJSON(formInfo);
    jsonForm.items = [...packageItems]
    jsonForm.Tax = tax
    jsonForm.ShippingAmount = shipping
    jsonForm.OrderTotal = orderTotal

    console.log(jsonForm);

    await checkout(jsonForm)

  }

  async function checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  calculatedDetails(taxAmount,shipping,orderTotal,packageItems());

})}}

// Initialize the cart icon and render cart contents
setupCartIcon();
renderCartContents();
loadHeaderFooter();
updateCartIcon();
