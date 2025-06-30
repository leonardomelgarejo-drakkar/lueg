Feature: Search Document

  Background:
  Given the user is on the login page
  When the user enters the correct username
  And the user enters the correct password
  And the user clicks the login button
  Then the user is on the home page

  @ui @search @document @success
  Scenario: 01 - Successful document search
    When the user fill in the basic search field with "PDS-ENF-24-Hour Notice of Execution of Abatement"
    Then the document is displayed with "PDS-ENF-24-Hour Notice of Execution of Abatement"
