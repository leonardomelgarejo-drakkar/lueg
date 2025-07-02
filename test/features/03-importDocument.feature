Feature: Import Document

  Background:
    Given the user is on the login page
    When the user enters the correct username
    And the user enters the correct password
    And the user clicks the login button
    Then the user is on the home page

  @ui @import @success
  Scenario: 01 - Successful import of a document
    When the user clicks the import document button
    And the user selects Object Type as "LUEG Permit Document"
    And the user selects Model-Template as "Framemaker 5.5 Letter"
    And the user selects LUEG Type as "PDS-ENF-Public Nuisance Abatement"
    And the user selects LUEG Subtype as "PDS-ENF-24-Hour Notice of Execution of Abatement"
    And the user fills the Record ID with a random number
    And the user clicks the save and close button
    And the user fill in the basic search field with "PDS-ENF-24-Hour Notice of Execution of Abatement"
    Then the imported document is displayed