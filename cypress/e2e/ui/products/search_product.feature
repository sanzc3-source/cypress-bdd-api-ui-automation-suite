@ui @smoke
Feature: UI - Products Search

  Scenario Outline: Search product and verify searched results
    Given I am on the home page
    When I navigate to the products page
    Then I should see the ALL PRODUCTS page
    When I search for product "<productName>"
    Then I should see SEARCHED PRODUCTS section
    And all searched products should be visible

    Examples:
      | productName |
      | top         |
