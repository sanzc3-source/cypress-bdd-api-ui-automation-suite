class PaymentPage {
  fillPayment(payment) {
    cy.get("input[name='name_on_card']").should("be.visible").clear().type(payment.nameOnCard);
    cy.get("input[name='card_number']").should("be.visible").clear().type(payment.cardNumber);
    cy.get("input[name='cvc']").should("be.visible").clear().type(payment.cvc);
    cy.get("input[name='expiry_month']").should("be.visible").clear().type(payment.expMonth);
    cy.get("input[name='expiry_year']").should("be.visible").clear().type(payment.expYear);
  }

  clickPayAndConfirm() {
    cy.contains(/Pay and Confirm Order/i).should("be.visible").click();
  }

  verifySuccessMessage() {
    cy.url({ timeout: 15000 }).should("include", "/payment_done");
    cy.contains(/order placed!/i, { timeout: 15000 }).should("be.visible");
  }

  verifyOrderPlacedHeading() {
    cy.contains(/ORDER PLACED!/i).should("be.visible");
  }
}

export default PaymentPage;
