import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "@pages/products/ProductsPage";
import CartPage from "@pages/products/CartPage";

const productsPage = new ProductsPage();
const cartPage = new CartPage();

// -------------------- ADD TO CART --------------------

When("I add product {int} to cart", (humanIndex) => {
  // Feature uses 1-based numbering; page method uses 0-based index
  const index = humanIndex - 1;
  productsPage.addProductToCartByIndex(index);
});

When("I continue shopping from the cart modal", () => {
  productsPage.continueShopping();
});

When("I view cart from the cart modal", () => {
  productsPage.viewCartFromModal();
});

// -------------------- CART ASSERTS --------------------

Then("the cart should have at least {int} items", (n) => {
  cartPage.assertCartHasAtLeastNItems(n);
});

Then("the cart should have {int} item", (n) => {
  cartPage.assertCartHasExactlyNItems(n);
});

// -------------------- REMOVE --------------------

When("I remove item {int} from the cart", (humanIndex) => {
  const index = humanIndex - 1;
  cartPage.removeItemByIndex(index);
});