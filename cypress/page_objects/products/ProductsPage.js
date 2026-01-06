class ProductsPage {
  clickProducts() {
    cy.contains("Products").click();
  }

  verifyAllProductsPage() {
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
  }

  searchProduct(productName) {
    cy.get("#search_product").should("be.visible").clear().type(productName);
    cy.get("#submit_search").click();
  }

  verifySearchedProductsVisible() {
    cy.contains("Searched Products").should("be.visible");
    cy.get(".productinfo").should("have.length.greaterThan", 0);
    cy.get(".productinfo").each(($el) => cy.wrap($el).should("be.visible"));
  }

   assertProductsPageVisible() {
    cy.get("body").should("contain.text", "All Products");
  }

  addProductToCartByIndex(index) {
    // Each product card is wrapped in .product-image-wrapper on AutomationExercise
    cy.get(".product-image-wrapper")
      .should("have.length.greaterThan", index)
      .eq(index)
      .scrollIntoView()
      .trigger("mouseover");

    // "Add to cart" appears as overlay link/button inside that card
    cy.get(".product-image-wrapper")
      .eq(index)
      .within(() => {
        cy.contains("Add to cart").should("be.visible").click();
      });
  }

  continueShopping() {
    cy.contains("Continue Shopping").should("be.visible").click();
  }

  viewCartFromModal() {
    cy.contains("View Cart").should("be.visible").click();
  }

    openFirstSearchedProductDetails() {
    cy.contains(/View Product/i).first().click();
  }
}

export default ProductsPage;
