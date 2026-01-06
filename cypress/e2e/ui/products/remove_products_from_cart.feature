@ui @regression
Feature: UI - Remove products from cart

  Background:
    Given I am on the home page
    And I verify the home page is visible

  Scenario: Add two products, remove one, and verify cart updates
    When I navigate to the products page
    Then I should see the ALL PRODUCTS page

    When I add product 1 to cart
    And I continue shopping from the cart modal
    And I add product 2 to cart
    And I view cart from the cart modal

    Then I should see the cart page
    And the cart should have at least 2 items

    When I remove item 1 from the cart
    Then the cart should have 1 item
