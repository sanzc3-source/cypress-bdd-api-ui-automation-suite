import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { makeUniqueEmail, makeFullName } from "@utils/testData";
import { AccountApi } from "@api/AccountApi";

const accountApi = new AccountApi();

let createdEmail;
let createdFullName;
let createdPassword;
let lastResponse;

// ---------- CREATE ----------
When(
  'I create an account via API for {string} {string} with email alias {string} and password {string}',
  function (firstName, lastName, emailAlias, password) {
    createdFullName = makeFullName(firstName, lastName);
    createdEmail = makeUniqueEmail(emailAlias);
    createdPassword = password;

    const payload = {
      name: createdFullName,
      email: createdEmail,
      password: createdPassword,

      title: "Mr",
      birth_date: "10",
      birth_month: "12",
      birth_year: "1995",
      firstname: firstName,
      lastname: lastName,
      company: "Init Company",
      address1: "123 Test Street",
      address2: "Suite 404",
      country: "USA",
      zipcode: "90210",
      state: "California",
      city: "Los Angeles",
      mobile_number: "9999999999",
    };

    return accountApi.createAccount(payload).then((res) => {
      lastResponse = res;

      // ✅ for api.common.steps.js
      this.apiResponse = res;

      // ✅ for After hook cleanup
      this.createdEmail = createdEmail;
      this.createdPassword = createdPassword;
    });
  }
);

// ---------- READ ----------
When("I get user detail by that email via API", function () {
  return accountApi.getUserDetailByEmail(createdEmail).then((res) => {
    lastResponse = res;

    // ✅ for api.common.steps.js
    this.apiResponse = res;
  });
});

// ---------- UPDATE ----------
When("I update the account via API changing company to {string}", function (company) {
  const [firstName, ...rest] = createdFullName.split(" ");
  const lastName = rest.join(" ");

  const payload = {
    name: createdFullName,
    email: createdEmail,
    password: createdPassword,

    title: "Mr",
    birth_date: "10",
    birth_month: "12",
    birth_year: "1995",
    firstname: firstName,
    lastname: lastName,
    company,
    address1: "123 Test Street",
    address2: "Suite 404",
    country: "USA",
    zipcode: "90210",
    state: "California",
    city: "Los Angeles",
    mobile_number: "9999999999",
  };

  return accountApi.updateAccount(payload).then((res) => {
    lastResponse = res;

    // ✅ for api.common.steps.js
    this.apiResponse = res;
  });
});

// ---------- DELETE ----------
When(
  "I delete the account via API using that email and password {string}",
  function (password) {
    return accountApi.deleteAccount(createdEmail, password).then((res) => {
      lastResponse = res;

      // ✅ for api.common.steps.js
      this.apiResponse = res;

      // ✅ keep in world (cleanup hook uses these)
      this.createdEmail = createdEmail;
      this.createdPassword = password;
    });
  }
);

// ---------- RESPONSE CONTENT ASSERTIONS ----------
Then("the user detail response should include name {string}", (expectedName) => {
  const body =
    typeof lastResponse.body === "string"
      ? JSON.parse(lastResponse.body)
      : lastResponse.body;

  const name = body?.user?.name || body?.name || body?.data?.name;
  expect(name, "user name").to.eq(expectedName);
});

Then("the user detail response should include company {string}", (expectedCompany) => {
  const body =
    typeof lastResponse.body === "string"
      ? JSON.parse(lastResponse.body)
      : lastResponse.body;

  const company = body?.user?.company || body?.company || body?.data?.company;
  expect(company, "company").to.eq(expectedCompany);
});
