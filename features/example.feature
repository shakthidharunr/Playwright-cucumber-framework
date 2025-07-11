Feature: Example Playwright BDD Test

  Scenario: Open Google and verify title
    Given I launch the browser
    When I navigate to "https://www.google.com"
    Then the page title should contain "Google"
