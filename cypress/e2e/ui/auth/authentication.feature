@ui @regression
Feature: UI - Authentication

    Background: 
        Given I am on the home page
        And I navigate to the signup/login page
    
    Scenario Outline: Register a new user successfully
    When I start signup for "<firstName>" "<lastName>" with email alias "<emailAlias>"
    And I fill the account info for "<firstName>" "<lastName>"
    And I submit the create account form
    Then I should see account created
    And I should be logged in as "<firstName> <lastName>"
    When I delete the account
    Then I should see account deleted

    Examples:
      | firstName | lastName | emailAlias |
      | Jonny     | Cage     | jonny.qa   |
      | Sarah     | Connor   | sarah.qa   |

  Scenario Outline: Login with invalid credentials shows error
    When I login using email "<email>" and password "<password>"
    Then I should see the login error message

    Examples:
      | email              | password  |
      | nobody@example.com | wrongpass |
      | test@example.com   | badbad    |

  Scenario Outline: Login with valid credentials
    Given a user exists with "<firstName>" "<lastName>" and email alias "<emailAlias>"
    When I login using that email and password "<password>"
    Then I should be logged in as "<firstName> <lastName>"
    And I delete the account

    Examples:
      | firstName | lastName | emailAlias | password     |
      | Johnny    | Cage     | johnny.ok  | P@ssword123  |
  

