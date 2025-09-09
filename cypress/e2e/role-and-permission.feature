Feature: Role and Permission

  Scenario: Create New Role
    Given I am logged in as "super admin" as user and "passadmin" as password
    When I click on the "Master" menu
    And I click on the "User" submenu
    And I select the "Role and Permission" page
    And I click the "Create" button
    And I type "admin master area" into the role name field
    And I click the "Save" button
    Then I should see the role "admin master area" in the role list

  Scenario: Duplicate role name
    Given I am logged in as a Super Admin
    And a role named "admin master area" already exists
    When I click on the "Master" menu
    And I click on the "User" submenu
    And I select the "Role and Permission" page
    And I click the "Create" button
    And I type "admin master area" into the role name field
    And I click the "Save" button
    Then I should see an error message saying "Role name already exists"
    And system should not save the role name
