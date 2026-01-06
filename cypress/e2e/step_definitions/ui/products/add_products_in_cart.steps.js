import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import HomePage from "../../../../page_objects/common/HomePage";
import ProductsPage from "../../../../page_objects/products/ProductsPage";
import CartPage from "../../../../page_objects/products/CartPage";

const homePage = new HomePage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();

Given("I launch the AutomationExercise site", () => {
  homePage.visitHome();
});

Given("I verify the home page is visible", () => {
  homePage.verifyHomeLoaded();
});

When("I click the Products button", () => {
  homePage.clickProducts();
  productsPage.assertProductsPageVisible();
});

When("I add the first product to cart and continue shopping", () => {
  productsPage.addProductToCartByIndex(0);
  productsPage.continueShopping();
});

When("I add the second product to cart", () => {
  productsPage.addProductToCartByIndex(1);
  productsPage.viewCartFromModal();
});

When("I view the cart", () => {
  cartPage.assertCartVisible();
});

Then("I should see valid price quantity and total for both products", () => {
  cartPage.assertEachLineHasValidPriceQtyTotalForFirstN(2);
});
