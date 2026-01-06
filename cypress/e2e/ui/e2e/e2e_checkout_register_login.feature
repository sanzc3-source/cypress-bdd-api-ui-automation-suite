@ui @e2e
Feature: E2E - Register, Logout, Login, Search, Qty 2, Checkout, Pay

  Background:
    Given I am on the home page

  Scenario Outline: Full flow checkout with registration and login
    # Register
    And I navigate to the signup/login page
    When I start signup for "<firstName>" "<lastName>" with email alias "<emailAlias>"
    And I fill the account info for "<firstName>" "<lastName>"
    And I submit the create account form
    Then I should see account created
    And I should be logged in as "<firstName> <lastName>"

    # Logout -> Login
    When I logout
    Then I should be logged out
    And I navigate to the signup/login page
    When I login using the newly created email and password "<password>"
    Then I should be logged in as "<firstName> <lastName>"

    # Search
    When I navigate to the products page
    Then I should see the ALL PRODUCTS page
    When I search for "<productName>"
    Then I should see searched products

    # Add searched product with qty=2
    When I open the first searched product details
    And I set product quantity to 2
    And I add the product to the cart from details page
    And I view cart from the add-to-cart modal
    Then I should see the cart page
    And the cart should show quantity 2 for the first item

    # Checkout + payment
    When I proceed to checkout
    Then I should see Address Details and Review Your Order
    When I enter checkout comment "<comment>"
    And I click Place Order
    And I enter valid payment details
    And I click Pay and Confirm Order
    Then I should see order placed successfully
    And I should see ORDER PLACED confirmation

    # Cleanup
    When I delete the account
    Then I should see account deleted

    Examples:
      | firstName | lastName | emailAlias | password    | productName | comment              |
      | Jonny     | Cage     | e2e.jonny   | P@ssword123 | Winter Top  | Please deliver ASAP. |
