@api @regression
Feature: API - Account APIs

  Scenario: API 11 - Create/Register User Account
    Given I have a unique API user payload
    When I call API to create the account
    Then the API response status should be 200
    And the API response should include header "content-type"
    And the API response body should contain "User created!"

  Scenario: API 12 - Delete User Account
    Given I have created an API user account
    When I call API to delete the account
    Then the API response status should be 200
    And the API response body should contain "Account deleted!"
