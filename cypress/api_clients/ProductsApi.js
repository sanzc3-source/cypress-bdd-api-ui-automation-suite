export class ProductsApi {
  searchProductWithoutParam() {
    return cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      // Intentionally DO NOT send search_product
      body: {},
      failOnStatusCode: false,
    });
  }

  // ...existing methods...
}
