import { Given, When } from "@cucumber/cucumber";
import { timeout } from "../../config/globalConfig";
import Assert from "../../helper/wrapper/assert";
import { fixture } from "../../hooks/pageFixture";
import HomePage from "../../pages/homePage";

let homePage: HomePage;
let assert: Assert;

Given('the user selects an index from the grid', { timeout: timeout }, async function () {
  homePage = new HomePage(fixture.page);
  await homePage.selectFirstCheckbox();

});

When('the user clicks the edit icon from the menu above the grid', { timeout: timeout }, async function () {
  await homePage.selectEditIcon();
});

When('the user edit Record ID with {string}', { timeout: timeout }, async function (editMessage: string) {
  await homePage.fillRecordIdWithEditedText(editMessage);
});

When('the user clicks the save button', { timeout: timeout }, async function () {
  await homePage.clickSave();
});
