Feature: Edit Index

  Background:
    Given the user is on the login page
    When the user enters the correct username
    And the user enters the correct password
    And the user clicks the login button
    Then the user is on the home page

  @ui @edit-index @success
  Scenario: 01 - User successfully edits an index
    When the user fill in the basic search field with "PDS-ENF-24-Hour Notice of Execution of Abatement"
    And the user edits a record from the grid menu
    Then the edited document is displayed
