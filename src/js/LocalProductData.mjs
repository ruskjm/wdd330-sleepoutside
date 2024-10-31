const baseURL = "../public/json";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class LocalProductData {
  constructor(category) {
    category = this.category
  }
  async getlocalData() {
      const response = await fetch(`${baseURL}/${this.category}.json`);
      console.log(response)
      const data = await convertToJson(response);
      console.log("this is the data: ", data.Result)
      return data.Result;
    }
    async findlocalProductById(id) {
      const response = await this.getlocalData();
      const filteredResults = await response.filter(results => results.Id === id)
      return filteredResults;
    }
}