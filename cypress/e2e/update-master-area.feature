Feature: Update Master Area

  Scenario: Set permission to update
    Given I am logged in as Super Admin
    And I am at the "Role and permission" viewing page
    When I click "admin master area"
    And I check "master"
    And I check "master area"
    And I check "read" and "update"
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

  Scenario: Update Master Area
    Given I sucesfully logged with username that has the role "Admin master area"
    When I click "master"
    And I click "master area"
    And I see list of master area
    And when I type keywords in search area
    And I see options of data that contains the keywords
    And I click the data I want to edit
    And I click edit button
    And update any fields in master area except "master area ID"
    And I click save
    Then system check that all data is unique
    And system save data

  Scenario: Update master area when data is duplicated
    When I click "master"
    And I click "master area"
    And I see list of master area
    And when I type keywords in search area
    And I see options of data that contains the keywords
    And I click the data I want to edit
    And I click edit button
    And update any fields in master area except "master area ID"
    And I click save
    Then system check that there is data that's not unique
    And I see the data that is not unique highlighted
    And I see error message "Data duplicatedd, please input other name"
