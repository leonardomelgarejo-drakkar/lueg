// test/steps/login.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { timeout } from "../../config/globalConfig";
import { CustomWorld } from "../../helper/support/custom-world";

Given('the user is on the login page', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.goto(process.env.BASEURL);
});

When('the user enters the correct username', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.fillUserName(process.env.USER_NAME);
});

When('the user enters the incorrect username', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.fillUserName("incorrect-username");
});

When('the user enters the correct password', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.fillPassword(process.env.PASSWORD);
});

When('the user enters the incorrect password', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.fillPassword("incorrect-password");
});

When('the user clicks the login button', { timeout }, async function (this: CustomWorld) {
  await this.loginPage.waitAndClickLoginButton();
});

Then('the user is on the home page', { timeout }, async function (this: CustomWorld) {
  const homeText = await this.homePage.getLUEGFilesHomeText();
  this.assert.assertElementContains(homeText, "LUEG Files");
});

Then('an error message is displayed', { timeout }, async function (this: CustomWorld) {
  const errorMessage = await this.loginPage.getErrorMessageText();
  this.assert.assertElementContains(errorMessage, "Invalid username or password");
});
