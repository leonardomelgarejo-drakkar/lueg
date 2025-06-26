Feature: Edit Index

  Background:
    Given the user is on the login page
    When the user enters the correct username
    And the user enters the correct password
    And the user clicks the login button
    Then the home page is displayed

  @ui @edit-index @success
  Scenario: 01 - User successfully edits an index
    Given the user selects an index from the grid
    When the user clicks the edit icon from the menu above the grid
    And the user edit Record ID with "Edited Record ID"
    And the user clicks the save button
    # Then the index is updated successfully
