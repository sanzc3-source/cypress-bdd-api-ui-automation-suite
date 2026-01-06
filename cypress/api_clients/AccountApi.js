export class AccountApi {
  createAccount(payload) {
    return cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    });
  }

  getUserDetailByEmail(email) {
    return cy.request({
      method: "GET",
      url: "/api/getUserDetailByEmail",
      qs: { email },
      failOnStatusCode: false,
    });
  }

  updateAccount(payload) {
    return cy.request({
      method: "PUT",
      url: "/api/updateAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    });
  }

  deleteAccount(email, password) {
    return cy.request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      body: { email, password },
      failOnStatusCode: false,
    });
  }

  // Explicit DELETE verifyLogin
  verifyLoginDelete(email, password, failOnStatusCode = false) {
    return cy.request({
      method: "DELETE",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode,
      body: { email, password },
    });
  }

  // Proper POST verifyLogin (for your API 7)
  verifyLoginPost(email, password, failOnStatusCode = false) {
    return cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode,
      body: { email, password },
    });
  }

  // Keep this for backward compatibility if your steps already use it
  verifyLogin(email, password) {
    return this.verifyLoginDelete(email, password, false);
  }
}
