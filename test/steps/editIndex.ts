import { When, Then } from "@cucumber/cucumber";
import { timeout } from "../../config/globalConfig";
import { CustomWorld } from "../../helper/support/custom-world";

let editedText: string;

When('the user edits a record from the grid menu', { timeout }, async function (this: CustomWorld) {
  await this.homePage.selectFirstCheckbox();
  await this.homePage.selectEditIcon();
  editedText = await this.homePage.fillRecordIdWithEditedText();
  await this.homePage.clickSave();
});

Then('the edited document is displayed', { timeout }, async function (this: CustomWorld) {
  await this.homePage.fillBasicSearchCriteria(editedText);
  const searchedText = await this.homePage.getSearchedText(editedText);
  this.assert.assertElementContains(searchedText, editedText);
});
