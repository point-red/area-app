Feature: Read Master Area

  Scenario: Set permission to read
    Given I am logged in as Super Admin
    And I am at the "Role and permission" viewing page
    When I click "admin master area"
    And I check "master"
    And I check "master area"
    And I check "read"
    And I click "save"
    Then system save the data
    And I see the message "Save Success"

  Scenario: Assign permission to user
    Given I am logged in as a Super Admin
    And a role named "admin master area" already exists
    When I click "master"
    And I click "User"
    And I click a username available
    And I click "role"
    And I click "Admin master area" as role
    Then system save "Admin master area" as role of user

  Scenario: View Master Area
    Given I sucesfully logged with username that has the role "Admin master area"
    When I click "master"
    And I click "master area"
    Then I can see data in "master area" with 25 data list per page
    And data is presented in columns with below label:
      | master area ID            |
      | province                  |
      | type-of-area              |
      | name-of-area              |
      | district                  |
      | subdistrict               |
      | subdistrict-target-value  |
      | subdistrict-target-outlet |
