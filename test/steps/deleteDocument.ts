  import { When, Then } from "@cucumber/cucumber";
  import { timeout } from "../../config/globalConfig";
  import { CustomWorld } from "../../helper/support/custom-world";
  
  When('the user delete the imported record from the grid menu', { timeout }, async function (this: CustomWorld) {
    await this.homePage.selectFirstCheckbox();
    await this.homePage.selectDeleteIcon();
    await this.homePage.clickDelete();
  });

  When('the imported document is not displayed', { timeout }, async function (this: CustomWorld) {
    await this.homePage.fillBasicSearchCriteria(this.importedDocumentRecordIdText);
    
    const isEmpty = await this.homePage.isGridEmpty();
    this.assert.assertTrue(isEmpty);
  });
