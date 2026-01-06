import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AuthPage from "@pages/auth/AuthPage";
import ProductsPage from "@pages/products/ProductsPage";

const authPage = new AuthPage();
const productsPage = new ProductsPage();

When("I navigate to the products page", () => {
  productsPage.clickProducts();
});

Then("I should see the ALL PRODUCTS page", () => {
  productsPage.verifyAllProductsPage();
});

When("I search for product {string}", (productName) => {
  productsPage.searchProduct(productName);
});

Then("I should see SEARCHED PRODUCTS section", () => {
  cy.contains("Searched Products").should("be.visible");
});

Then("all searched products should be visible", () => {
  productsPage.verifySearchedProductsVisible();
});

// Alias for E2E wording: "I search for <productName>"
When("I search for {string}", (productName) => {
  productsPage.searchProduct(productName);
});

// Alias for E2E wording: "I should see searched products"
Then("I should see searched products", () => {
  // Reuse your existing validations
  cy.contains("Searched Products").should("be.visible");
  productsPage.verifySearchedProductsVisible();
});
