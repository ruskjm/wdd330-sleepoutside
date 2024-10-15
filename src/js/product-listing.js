import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
console.log(category)
const listing = new ProductList(category, dataSource, element);

listing.init();
loadHeaderFooter();