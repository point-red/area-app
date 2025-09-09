Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I enter a valid username and a valid password
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see complete menu
