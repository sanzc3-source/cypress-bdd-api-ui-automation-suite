import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import ProductsPage from "@pages/products/ProductsPage";
import ProductDetailsPage from "@pages/products/ProductDetailsPage";
import CartPage from "@pages/products/CartPage";

import CheckoutPage from "@pages/checkout/CheckoutPage";
import PaymentPage from "@pages/checkout/PaymentPage";

import { makePaymentData } from "@utils/testData";

const productsPage = new ProductsPage();
const productDetailsPage = new ProductDetailsPage();
const cartPage = new CartPage();

const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

let paymentData;

// ----- Search result -> details -----
When("I open the first searched product details", () => {
  productsPage.openFirstSearchedProductDetails();
});

When("I set product quantity to {int}", (qty) => {
  productDetailsPage.setQuantity(qty);
});

When("I add the product to the cart from details page", () => {
  productDetailsPage.clickAddToCart();
});

Then("the cart should show quantity {int} for the first item", (qty) => {
  cy.get("#cart_info_table tbody tr")
    .first()
    .find(".cart_quantity")
    .invoke("text")
    .then((t) => {
      const cleaned = String(t).replace(/[^0-9]/g, "");
      expect(Number(cleaned)).to.eq(qty);
    });
});

// ----- Checkout -----
When("I proceed to checkout", () => {
  cy.contains(/Proceed To Checkout/i).should("be.visible").click();
});

Then("I should see Address Details and Review Your Order", () => {
  checkoutPage.verifyAddressAndReview();
});

When("I enter checkout comment {string}", (comment) => {
  checkoutPage.typeComment(comment);
});

When("I click Place Order", () => {
  checkoutPage.clickPlaceOrder();
});

// ----- Payment -----
When("I enter valid payment details", () => {
  paymentData = makePaymentData();
  paymentPage.fillPayment(paymentData);
});

When("I click Pay and Confirm Order", () => {
  paymentPage.clickPayAndConfirm();
});

Then("I should see order placed successfully", () => {
  paymentPage.verifySuccessMessage();
});

Then("I should see ORDER PLACED confirmation", () => {
  paymentPage.verifyOrderPlacedHeading();
});