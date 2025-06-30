import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/playwrightWrappers";

export default class HomePage {

  private base: PlaywrightWrapper;

  constructor(private page: Page){
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    optionRole: "option",
    buttonRole: "button",
    textboxRole: "textbox",
    searchboxRole: "searchbox",
    luegFilesHomeText: "LUEG Files",
    recordIdText: "Record ID*",
    searchNameText: "Search...",
    recordIdForEditText: "Record ID",
    createDocumentIcon: "#b13-LinkCreateDocumentToolbar .fa-plus-square",
    dropdownObjectTypeLocator: "#b13-b45-DropdownDocumentTypeId",
    dropdownModelTemplateLocator: "#b13-b45-b1-SelectedValues",
    checkboxIndexLocators: "[id*='SelectCheckbox']",
    editIndexIconLocator: "[id*='LinkEditToolbar'] > i",
    saveEditButtonLocator: "[id*='ContainerButtons'] > button.btn.btn-primary"
  }

  async getLUEGFilesHomeText(){
    return await this.base.getByText(this.Elements.luegFilesHomeText);
  }

  async clickCreateDocument(){
    await this.base.waitAndClick(this.Elements.createDocumentIcon);
  }

  async selectDropdownObjectType(optionLabel: string){
    await this.base.selectDropdownOption(this.Elements.dropdownObjectTypeLocator, optionLabel);
  }

  async selectDropdownModelTemplate(optionLabel: string){
    await this.base.waitAndClick(this.Elements.dropdownModelTemplateLocator);
    await this.base.waitAndClickGetByRole(this.Elements.optionRole, 'TEMPLATE-PDS-ENF-24-Hour');
    await this.base.waitAndClickGetByRoleExact(this.Elements.buttonRole, 'Save', true);
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.recordIdText, 'Test Example');
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, 'Save and Close');
  }

  async fillBasicSearchCriteria(searchCriteria: string) {
    await this.base.fillByRole(this.Elements.searchboxRole, this.Elements.searchNameText, searchCriteria);
    await this.base.waitForElementGetByText(searchCriteria);
  }

  async getSearchedText(searchCriteria: string) {
    const element = await this.base.getByTextExact(searchCriteria, true);
    await this.base.waitForElementGetByText(searchCriteria);

    return element;
  }

  async selectFirstCheckbox() {
    await this.base.waitAndClickFirstElement(this.Elements.checkboxIndexLocators);
  }

  async selectEditIcon() {
    await this.base.waitAndClick(this.Elements.editIndexIconLocator);
  }

  async fillRecordIdWithEditedText() {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const editedText = 'Edited Record ID ' + randomNumber;
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.recordIdForEditText, editedText);
    return editedText;
  }

  async clickSave() {
    await this.base.waitAndClick(this.Elements.saveEditButtonLocator);
  }

}