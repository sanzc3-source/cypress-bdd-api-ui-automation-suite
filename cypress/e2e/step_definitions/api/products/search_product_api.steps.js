import { When } from "@badeball/cypress-cucumber-preprocessor";
import { ProductsApi } from "@api/ProductsApi";

const productsApi = new ProductsApi();

When("I call API search product without search_product parameter", function () {
  return productsApi.searchProductWithoutParam().then((res) => {
    this.apiResponse = res;
  });
});
