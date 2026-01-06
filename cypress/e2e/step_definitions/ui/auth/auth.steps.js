import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { makeUniqueEmail, makeFullName } from "@utils/testData";
import HomePage from "@pages/common/HomePage";
import AuthPage from "@pages/auth/AuthPage";

const homePage = new HomePage();
const authPage = new AuthPage();

let fullName;

// -------------------- BACKGROUND --------------------
Given(/I navigate to the signup\/login page/, () => {
  homePage.clickSignupLogin();
  authPage.verifyOnAuthPage();
});


// -------------------- REGISTER --------------------

When(
  "I start signup for {string} {string} with email alias {string}",
  (firstName, lastName, emailAlias) => {
    fullName = makeFullName(firstName, lastName);      // "First Last"
    const email = makeUniqueEmail(emailAlias);         // alias+timestamp@example.com

    Cypress.env("createdEmail", email);                // store for E2E login later
    Cypress.env("createdFullName", fullName);          // optional, useful for debugging

    authPage.startSignup(fullName, email);             // start signup
    authPage.verifyEnterAccountInfoPage();             // confirm account info screen
  }
);


When("I fill the account info for {string} {string}", (firstName, lastName) => {
  authPage.fillAccountInformation(firstName, lastName);
});

When("I submit the create account form", () => {
  authPage.submitCreateAccount();
});

Then("I should see account created", () => {
  authPage.confirmAccountCreated();
});

Then("I should be logged in as {string}", (expectedName) => {
  authPage.verifyLoggedInAs(expectedName);
});

When("I delete the account", () => {
  authPage.deleteAccount();
});

Then("I should see account deleted", () => {
  authPage.confirmAccountDeleted();
});

// -------------------- LOGIN (INVALID) --------------------

When("I login using email {string} and password {string}", (email, password) => {
  authPage.login(email, password);
});

Then("I should see the login error message", () => {
  authPage.verifyLoginError("Your email or password is incorrect!");
});

// ---------- LOGIN (VALID) ----------

let validEmail;
let validFullName;

Given(
  "a user exists with {string} {string} and email alias {string}",
  (firstName, lastName, emailAlias) => {
    validFullName = makeFullName(firstName, lastName);
    validEmail = makeUniqueEmail(emailAlias);

    // Create user via UI
    homePage.visitHome();
    homePage.clickSignupLogin();

    authPage.startSignup(validFullName, validEmail);
    authPage.verifyEnterAccountInfoPage();

    authPage.fillAccountInformation(firstName, lastName);
    authPage.submitCreateAccount();
    authPage.confirmAccountCreated();
    authPage.logout();

  }
);

When(
  "I login using that email and password {string}",
  (password) => {
    authPage.login(validEmail, password);
  }
);

// -------------------- LOGOUT (E2E) --------------------
When("I logout", () => {
  authPage.logout(); // you already use this in the valid-user setup
});

Then("I should be logged out", () => {
  // simple, stable assertion
  cy.contains(/Signup\s*\/\s*Login/i).should("be.visible");
});

// -------------------- LOGIN WITH CREATED EMAIL (E2E) --------------------
When("I login using the newly created email and password {string}", (password) => {
  const email = Cypress.env("createdEmail");
  expect(email, "createdEmail must be set during signup").to.be.a("string").and.not.be.empty;

  authPage.login(email, password);
});


