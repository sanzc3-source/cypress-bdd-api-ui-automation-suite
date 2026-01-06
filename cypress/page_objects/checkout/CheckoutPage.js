class CheckoutPage {
  verifyAddressAndReview() {
    cy.contains(/Address Details/i).should("be.visible");
    cy.contains(/Review Your Order/i).should("be.visible");
  }

  typeComment(comment) {
    cy.get("textarea[name='message']").should("be.visible").clear().type(comment);
  }

  clickPlaceOrder() {
    cy.contains(/Place Order/i).should("be.visible").click();
  }
}

export default CheckoutPage;
