@api @regression
Feature: API - Verify Login

  Scenario: API 9 - DELETE to verify login with invalid credentials
    When I call API verify login with email "invalid@example.com" and password "wrongpass"
    Then the API response JSON should have responseCode 405
    And the API response body should contain "This request method is not supported."
