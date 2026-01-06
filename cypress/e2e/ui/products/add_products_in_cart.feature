@ui @regression
Feature: UI - Add products in cart

  Scenario: Add two products to cart and verify pricing totals
    Given I launch the AutomationExercise site
    And I verify the home page is visible
    When I click the Products button
    And I add the first product to cart and continue shopping
    And I add the second product to cart
    And I view the cart
    Then I should see both products in the cart
    And I should see valid price quantity and total for both products
