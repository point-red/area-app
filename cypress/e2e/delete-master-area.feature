Feature: Delete Master Area

  Scenario: Set permission to delete
    Given I am logged in as Super Admin
    And I am at the "Role and permission" viewing page
    When I click "admin master area"
    And I check "master"
    And I check "master area"
    And I check "read" and "delete"
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

  Scenario: Delete Master Area Successful when "master area" has not been used in "pin_point_sales_visitation"
    Given I sucesfully logged with username that has the role "Admin master area"
    When I click "master"
    And I click "master area"
    And I see list of master area
    And when I type keywords in search area
    And I see options of data that contains the keywords
    And I click the data I want to delete
    And I click the master ID of what I want to delete under province "Surabaya"
    And I click delete button
    And system see the master area ID has not been used in "pin_point_sales_visitation"
    And system delete data

  Scenario: Delete Master Area Successful when "master area" has been used in "pin_point_sales_visitation", but has not been used in "pin_point_sales_visitation_detail")
    When I click "master"
    And I click "master area"
    And I see list of master area
    And when I type keywords in search area
    And I see options of data that contains the keywords
    And I click the data I want to delete
    And I click the master ID of what I want to delete under province "Surabaya"
    And I click delete button
    And system see the master area ID has not been used in "pin_point_sales_visitation"
    And system see the "sales visitation ID" has not been used in "pin_point_sales_visitation_details"
    And system delete data

  Scenario: Delete master area when data has been used in "pin_point_sales_visitation_detail"
    When I click "master"
    And I click "master area"
    And I see list of master area
    And when I type keywords in search area
    And I see options of data that contains the keywords
    And I click the data I want to delete
    And I click the master ID of what I want to delete under province "Surabaya"
    And I click delete button
    And system see the master area ID has been used in "pin_point_sales_visitation"
    And system see the "sales visitation ID" has not been used in "pin_point_sales_visitation_details"
    And I see error message "Data used in transaction, cannot delete data"
