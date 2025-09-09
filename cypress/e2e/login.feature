Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I enter a valid username and a valid password
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see complete menu

  Scenario: Wrong username
    Given I am on the login page
    When I enter an incorrect username and a valid password
    And I click the "Login" button
    Then I should see an error message saying "Invalid username or password"
    And I should remain on the login page

  Scenario: Wrong password
    Given I am on the login page
    When I enter a valid username and an incorrect password
    And I click the "Login" button
    Then I should see an error message saying "Invalid username or password"
    And I should remain on the login page
