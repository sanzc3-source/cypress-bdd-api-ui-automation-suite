import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import apiUser from "@fixtures/apiUser.json";
import { generateUniqueEmail } from "@utils/apiHelpers";
import { AccountApi } from "@api/AccountApi";

const accountApi = new AccountApi();

/**
 * Verify Login API steps
 * NOTE: Shared Then assertions live in:
 *   cypress/e2e/step_definitions/common/api.common.steps.js
 * and read from: this.apiResponse
 */

Given("I have a unique API user payload", function () {
  const createdEmail = generateUniqueEmail();
  this.userPayload = { ...apiUser, email: createdEmail };
  this.createdEmail = createdEmail;
});

Given("I have created an API user account", function () {
  const createdEmail = generateUniqueEmail();
  const userPayload = { ...apiUser, email: createdEmail };

  this.userPayload = userPayload;
  this.createdEmail = createdEmail;

  // IMPORTANT: return so Cypress waits
  return accountApi.createAccount(userPayload).then((res) => {
    this.apiResponse = res;
    expect(res.status).to.eq(200); // quick sanity check
  });
});

When("I call API to create the account", function () {
  // IMPORTANT: return so Cypress waits
  return accountApi.createAccount(this.userPayload).then((res) => {
    this.apiResponse = res;
  });
});

When("I call API to delete the account", function () {
  // IMPORTANT: return so Cypress waits
  return accountApi.deleteAccount(this.createdEmail, this.userPayload.password).then((res) => {
    this.apiResponse = res;
  });
});
