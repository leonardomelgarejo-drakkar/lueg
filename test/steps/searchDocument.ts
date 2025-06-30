import { When, Then } from "@cucumber/cucumber";
import { timeout } from "../../config/globalConfig";
import { CustomWorld } from "../../helper/support/custom-world";

When('the user fill in the basic search field with {string}', { timeout }, async function (this: CustomWorld, searchCriteria: string) {
  await this.homePage.fillBasicSearchCriteria(searchCriteria);
});

Then('the document is displayed with {string}', { timeout }, async function (this: CustomWorld, searchText: string) {
  const searchedText = await this.homePage.getSearchedText(searchText);
  this.assert.assertElementContains(searchedText, searchText);
});
