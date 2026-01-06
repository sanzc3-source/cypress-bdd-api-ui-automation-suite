// cypress/page_objects/AuthPage.js
// Purpose: actions + assertions for Signup/Login page + registration flow

class AuthPage {
  verifyOnAuthPage() {
    cy.url().should("include", "/login");
    cy.contains("Login to your account").should("be.visible");
    cy.contains("New User Signup!").should("be.visible");
  }

  // ---------- REGISTER ----------
  startSignup(fullName, email) {
    cy.get('input[data-qa="signup-name"]').clear().type(fullName);
    cy.get('input[data-qa="signup-email"]').clear().type(email);
    cy.get('button[data-qa="signup-button"]').click();
  }

  verifyEnterAccountInfoPage() {
    cy.contains("Enter Account Information", { matchCase: false }).should(
      "be.visible"
    );
  }

  fillAccountInformation(firstName, lastName) {
    // Title
    cy.get("#id_gender1").check();

    // Password + DOB
    cy.get("#password").type("P@ssword123");
    cy.get("#days").select("10");
    cy.get("#months").select("May");
    cy.get("#years").select("1990");

    // Optional checkboxes
    cy.get("#newsletter").check();
    cy.get("#optin").check();

    // Address details
    cy.get("#first_name").type(firstName);
    cy.get("#last_name").type(lastName);
    cy.get("#company").type("QA Ninjas Inc");
    cy.get("#address1").type("123 Test Street");
    cy.get("#address2").type("Suite 404");
    cy.get("#country").select("India");
    cy.get("#state").type("Uttar Pradesh");
    cy.get("#city").type("Bareilly");
    cy.get("#zipcode").type("243001");
    cy.get("#mobile_number").type("9999999999");
  }

  submitCreateAccount() {
    cy.get('button[data-qa="create-account"]').click();
  }

  confirmAccountCreated() {
    cy.contains("Account Created!", { matchCase: false }).should("be.visible");
    cy.get('a[data-qa="continue-button"]').click();
  }

  verifyLoggedInAs(fullName) {
    cy.contains(`Logged in as ${fullName}`).should("be.visible");
  }

  deleteAccount() {
    cy.contains("Delete Account").click();
  }

  confirmAccountDeleted() {
    cy.contains("Account Deleted!", { matchCase: false }).should("be.visible");
  }

  // ---------- LOGIN ----------
  login(email, password) {
    cy.get('input[data-qa="login-email"]').clear().type(email);
    cy.get('input[data-qa="login-password"]').clear().type(password);
    cy.get('button[data-qa="login-button"]').click();
  }

  verifyLoginError(message = "Your email or password is incorrect!") {
    cy.contains(message).should("be.visible");
  }

  logout() {
  cy.contains("Logout").click();
}

}

export default AuthPage;
