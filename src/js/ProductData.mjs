const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
  }
  async getData(category) {
    console.log(category)
      const response = await fetch(`${baseURL}products/search/${category}`);
      console.log(response)
      const data = await convertToJson(response);
      console.log("this is the data: ", data.Result)
      return data.Result;
    }
    async findProductById(id) {
      const response = await fetch(baseURL + `product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    }
}