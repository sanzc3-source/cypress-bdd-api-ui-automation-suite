import { Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Helper: Get apiResponse from the Cucumber World (preferred),
 * or fall back to Cypress alias @apiResponse if present.
 */
function getApiResponse(world) {
  if (world && world.apiResponse) return cy.wrap(world.apiResponse, { log: false });

  // fallback: allow step defs to store response as alias instead
  return cy.get("@apiResponse", { log: false });
}

Then("the API response status should be {int}", function (statusCode) {
  return getApiResponse(this).then((res) => {
    expect(res, "apiResponse should exist").to.exist;
    expect(res.status).to.eq(statusCode);
  });
});

Then("the API response should include header {string}", function (headerName) {
  return getApiResponse(this).then((res) => {
    expect(res, "apiResponse should exist").to.exist;
    expect(res.headers).to.have.property(headerName);
  });
});

Then("the API response body should contain {string}", function (text) {
  return getApiResponse(this).then((res) => {
    expect(res, "apiResponse should exist").to.exist;

    const bodyStr =
      typeof res.body === "string" ? res.body : JSON.stringify(res.body);

    expect(bodyStr).to.include(text);
  });
});

Then("the API response JSON should have responseCode {int}", function (code) {
  return getApiResponse(this).then((res) => {
    expect(res, "apiResponse should exist").to.exist;

    const body =
      typeof res.body === "string" ? JSON.parse(res.body) : res.body;

    expect(body.responseCode).to.eq(code);
  });
});
