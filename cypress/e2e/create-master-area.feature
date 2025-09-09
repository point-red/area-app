Feature: Create Master Area

  Scenario: Set permission to read
    Given I am logged in as Super Admin
    And I am at the "Role and permission" viewing page
    When I click "admin master area"
    And I check "master"
    And I check "master area"
    And I check "read" and "create"
    And I click "save"
    Then system save the data
    And I see the message "Save Success"

  Scenario: Assign permission to user
    Given I am logged in as a Super Admin
    And a role named "admin master area" already exists
    When I click "master"
    And I click "User"
    And I click a username from available user
    And I click "role"
    And I click "Admin master area" as role
    Then system save "Admin master area" as role of user

  Scenario: Create Master Area
    Given I sucesfully logged with username that has the role "Admin master area"
    When I click "master"
    And I click "master area"
    And I click "create"
    Then System generate unique incremental 6 digit master area ID and User see fields:
      | province                  |
      | type of area              |
      | name of area              |
      | district                  |
      | subdistrict               |
      | subdistrict target value  |
      | subdistrict target outlet |

  Scenario: Input province
    Given User in create master area menu
    When User click province
    And User type name of province
    And User click enter
    Then System check if data not yet exist
    And system save data
    And system direct user to "type of area" field

  Scenario: Input province If data is not unique
    When User click province
    And User type name of province
    And User click enter
    Then System check, if data exist: system show error message “data duplicated, please input other name”
    And system directs back to name of subdistrict field

  Scenario: Master area to input regency
    When User click type of area
    And User click button options: regency
    And User click name of area field
    And User type name of area
    And User click enter
    Then System check if data not yet exist
    And system save data
    And system direct user to "district" field

  Scenario: Input regency If data is not unique
    When User click type of area
    And User click button options: regency
    And User click name of area field
    And User type name of area
    And User click enter
    Then System check, if data exist: system show error message “data duplicated, please input other name”
    And system directs back to name of subdistrict field

  Scenario: Master area to input city
    When User click type of area
    And User click button options: city
    And User click name of area field
    And User type name of area
    And User click enter
    Then System check if data not yet exist
    And system save data
    And system direct user to "district" field

  Scenario: Input city If data is not unique
    When User click type of area
    And User click button options: city
    And User click name of area field
    And User type name of area
    And User click enter
    Then System check, if data exist: system show error message “data duplicated, please input other name”
    And system directs back to name of subdistrict field

  Scenario: Input district
    Given User in create master area menu
    When User click district
    And User type name of district
    And User click enter
    Then System check if data not yet exist
    And system save data
    And system direct user to "type of area" field

  Scenario: Input district If data is not unique
    When User click district
    And User type name of district
    And User click enter
    Then System check, if data exist: system show error message “data duplicated, please input other name”
    And system directs back to name of subdistrict field

  Scenario: Input subdistrict
    Given User in create master area menu
    When User click subdistrict
    And User type name of subdistrict
    And User click enter
    Then System check if data not yet exist
    And system save data
    And system direct user to "type of area" field

  Scenario: Input subdistrict If data is not unique
    When User click subdistrict
    And User type name of subdistrict
    And User click enter
    Then System check, if data exist: system show error message “data duplicated, please input other name”
    And system directs back to name of subdistrict field

  Scenario: Input target value subdistrict
    When User click target value subdistrict
    And User type target value
    And User click enter
    Then System save data

  Scenario: Input target outlet subdistrict
    When User click target outlet subdistrict
    And User type target outlet
    And User click enter
    Then System save new "master area" data

  Scenario: Input master area data by import
    When user click import symbol
    And I upload this data
    And I see fields in master area:
      | province                  |
      | type-of-area              |
      | name-of-area              |
      | district                  |
      | subdistrict               |
      | subdistrict-target-value  |
      | subdistrict-target-outlet |
    And I click column 2 in "province"
    And I click column 3 in "type-of-area"
    And I click column 4 in "name-of-area"
    And I click column 5 in "district"
    And I click column 6 in "subdistrict"
    And I click column 7 in "subdistrict-target-value"
    And I click column 8 in "subdistrict-target-outlet"
    Then system checks identical data of subdistrict, district, name-of-area, tyep-of-area, and province exist
    And system ignore identical data
    And system generates 6 digit unique master ID for all other data
    And system save data
