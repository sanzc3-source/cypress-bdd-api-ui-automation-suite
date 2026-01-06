@api @crud
Feature: API - Account CRUD

  Scenario Outline: Create, Read, Update, Delete user account
    When I create an account via API for "<firstName>" "<lastName>" with email alias "<emailAlias>" and password "<password>"
    Then the API response status should be 200
    And the API response JSON should have responseCode 201
    And the API response body should contain "User created!"


    When I get user detail by that email via API
    Then the API response status should be 200
    And the user detail response should include name "<firstName> <lastName>"

    When I update the account via API changing company to "<company>"
    Then the API response status should be 200
    And the API response body should contain "User updated!"

    When I get user detail by that email via API
    Then the API response status should be 200
    And the user detail response should include company "<company>"

    When I delete the account via API using that email and password "<password>"
    Then the API response status should be 200
    And the API response body should contain "Account deleted!"

    Examples:
      | firstName | lastName | emailAlias     | password    | company       |
      | Jonny     | Cage     | crud.jonny.api  | P@ssword123 | QA Test Inc |
