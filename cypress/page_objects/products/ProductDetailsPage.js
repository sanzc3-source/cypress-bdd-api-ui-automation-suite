class ProductDetailsPage {
  setQuantity(n) {
    cy.get("#quantity").should("be.visible").clear().type(String(n));
  }

  clickAddToCart() {
    cy.contains(/Add to cart/i).should("be.visible").click();
  }
}

export default ProductDetailsPage;
