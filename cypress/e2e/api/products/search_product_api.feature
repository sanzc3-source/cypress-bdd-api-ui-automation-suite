@api @regression
Feature: API - Product APIs

  Scenario: API 6 - Search Product without search_product parameter
    When I call API search product without search_product parameter
    Then the API response status should be 200
    And the API response body should contain "Bad request"
