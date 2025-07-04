Feature: Delete Document

  Background:
    Given the user is on the login page
    When the user enters the correct username
    And the user enters the correct password
    And the user clicks the login button
    And the user is on the home page
    When the user clicks the import document button
    And the user selects Object Type as "LUEG Permit Document"
    And the user selects Model-Template as "Framemaker 5.5 Letter"
    And the user selects LUEG Type as "PDS-ENF-Public Nuisance Abatement"
    And the user selects LUEG Subtype as "PDS-ENF-24-Hour Notice of Execution of Abatement"
    And the user fills the Record ID with a random number
    And the user clicks the save and close button
    Then the imported document is displayed

  @ui @delete @success
  Scenario: 01 - Successful delete a document
    When the user delete the imported record from the grid menu
    Then the imported document is not displayed