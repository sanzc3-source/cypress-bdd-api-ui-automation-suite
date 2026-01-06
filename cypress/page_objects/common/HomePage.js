// cypress/page_objects/HomePage.js
// Purpose: small, stable actions on the Home page

class HomePage {
  visitHome() {
    cy.visit("/"); // uses baseUrl from cypress.config.js
  }

  verifyHomeLoaded() {
  // Confirm we’re on the right domain
  cy.location("hostname", { timeout: 15000 }).should("contain", "automationexercise.com");

  // Confirm the document is ready
  cy.document({ timeout: 15000 })
    .its("readyState")
    .should("eq", "complete");

  // Confirm home page is visible using a flexible match + longer timeout
  cy.contains(/Automation\s*Exercise/i, { timeout: 15000 }).should("be.visible");
  }

  // Click Sign Up Login
  clickSignupLogin() {
    cy.contains("Signup / Login").click();
  }

  // Click Products
  clickProducts() {
  cy.contains("Products").should("be.visible").click();
  }

}

export default HomePage;
