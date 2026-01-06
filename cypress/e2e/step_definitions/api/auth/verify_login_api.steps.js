import { When } from "@badeball/cypress-cucumber-preprocessor";
import { AccountApi } from "@api/AccountApi";

const accountApi = new AccountApi();

When(
  "I call API verify login with email {string} and password {string}",
  function (email, password) {
    return accountApi.verifyLogin(email, password).then((res) => {
      this.apiResponse = res;
    });
  }
);
