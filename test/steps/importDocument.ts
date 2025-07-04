import { Then, When } from "@cucumber/cucumber";
import { timeout } from "../../config/globalConfig";
import { CustomWorld } from "../../helper/support/custom-world";

// let importedDocumentRecordIdText: string;

When('the user clicks the import document button', { timeout }, async function (this: CustomWorld) {
  await this.homePage.waitAndClickImportDocumentButton();
});

When('the user selects Object Type as {string}', { timeout }, async function (this: CustomWorld, objectType: string) {
  await this.homePage.selectDropdownObjectType(objectType);
});

When('the user selects Model-Template as {string}', { timeout }, async function (this: CustomWorld, modelTemplate: string) {
  await this.homePage.waitAndClickDropdownModelTemplate();
  await this.homePage.selectDropdownModelTemplate(modelTemplate);
  await this.homePage.clickSave();
});

When('the user selects LUEG Type as {string}', { timeout }, async function (this: CustomWorld, luegType: string) {
  await this.homePage.waitAndClickDropdownLUEGType(luegType);
});

When('the user selects LUEG Subtype as {string}', { timeout }, async function (this: CustomWorld, luegSubtype: string) {
  await this.homePage.waitAndClickDropdownLUEGSubtype(luegSubtype);
});

When('the user fills the Record ID with a random number', { timeout }, async function (this: CustomWorld) {
  this.importedDocumentRecordIdText = await this.homePage.fillRecordIdWithImportedDocumentText();
});

When('the user clicks the save and close button', { timeout }, async function (this: CustomWorld) {
  await this.homePage.clickSaveAndClose();
});

Then('the imported document is displayed', { timeout }, async function (this: CustomWorld) {
  await this.homePage.fillBasicSearchCriteria(this.importedDocumentRecordIdText);
  const searchedText = await this.homePage.getSearchedText(this.importedDocumentRecordIdText);
  this.assert.assertElementContains(searchedText, this.importedDocumentRecordIdText);
});
