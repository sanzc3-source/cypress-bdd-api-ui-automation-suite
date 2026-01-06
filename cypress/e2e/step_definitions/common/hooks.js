import { After } from "@badeball/cypress-cucumber-preprocessor";
import { AccountApi } from "@api/AccountApi";

const accountApi = new AccountApi();

/**
 * Cleanup after CRUD scenarios.
 * Runs only for scenarios tagged @crud.
 */
After({ tags: "@crud" }, function () {
  // `this` is the Cucumber World for the scenario
  const email = this.createdEmail;
  const password = this.createdPassword;

  // If scenario failed before creation, nothing to cleanup
  if (!email || !password) return;

  // Try delete; do not fail the run if cleanup fails
  return accountApi.deleteAccount(email, password).then(() => {});
});
