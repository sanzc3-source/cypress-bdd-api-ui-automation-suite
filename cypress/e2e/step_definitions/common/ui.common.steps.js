import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { When } from "@badeball/cypress-cucumber-preprocessor";
import { Then } from "@badeball/cypress-cucumber-preprocessor";

import HomePage from "@pages/common/HomePage";
import CartPage from "@pages/products/CartPage";

const homePage = new HomePage();
const cartPage = new CartPage();


Given("I am on the home page", () => {
  homePage.visitHome();
  homePage.verifyHomeLoaded();
});

When("I view cart from the add-to-cart modal", () => {
  // The "Added!" modal is usually #cartModal on AutomationExercise
  cy.get("#cartModal", { timeout: 10000 })
    .should("be.visible")
    .within(() => {
      // Most reliable: link text
      cy.contains("a", "View Cart").should("be.visible").click();
    });

  // Confirm we landed on the cart page
  cy.url().should("include", "/view_cart");
});

Then("I should see the {string} page", (pageName) => {
  const routes = { cart: "/view_cart", checkout: "/checkout", login: "/login", signup: "/signup", products: "/products", home: "/" };
  cy.url({ timeout: 10000 }).should("include", routes[pageName.toLowerCase()]);
});

Then("I should see both products in the cart", () => {
  cartPage.assertCartHasAtLeastNItems(2);
});

Then("I should see the cart page", () => {
  cy.url({ timeout: 10000 }).should("include", "/view_cart");
  cy.contains(/shopping cart/i).should("be.visible");
})
