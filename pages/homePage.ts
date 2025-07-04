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
    noItemsText: "No items to show...",
    recordIdForEditText: "Record ID",
    createDocumentIcon: "#b13-LinkCreateDocumentToolbar .fa-plus-square",
    selectAnOptionName: "Select an option",
    saveEditButtonName: "Save",
    saveAndCloseName: "Save and Close",
    deleteIconName: "Delete",
    dropdownObjectTypeLocator: "select[id*='DropdownDocumentTypeId']",
    dropdownModelTemplateLocator: "#b13-b45-b1-SelectedValues",
    dropdownLUEGTypeLocator: "[id*=DropdownSearch]:below(label:has-text('LUEG Type'))",
    dropdownLUEGSubtypeLocator: "[id*=DropdownSearch]:below(label:has-text('LUEG Subtype'))",
    importDocumentButton: "[id*='LinkImportDocumentToolbar'] > i",
    checkboxIndexLocators: "[id*='SelectCheckbox']",
    editIndexIconLocator: "[id*='LinkEditToolbar'] > i",
    deleteIconLocator: "[id*='LinkDeleteToolbar'] > i"
  };

  async getLUEGFilesHomeText(){
    return await this.base.getByText(this.Elements.luegFilesHomeText);
  }

  async clickCreateDocument(){
    await this.base.waitAndClick(this.Elements.createDocumentIcon);
  }

  async selectDropdownObjectType(optionLabel: string){
    await this.base.selectDropdownOption(this.Elements.dropdownObjectTypeLocator, optionLabel);
  }

  async waitAndClickDropdownModelTemplate() {
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, this.Elements.selectAnOptionName);
  }

  async selectDropdownModelTemplate(optionLabel: string) {
    await this.base.waitAndClickGetByRole(this.Elements.optionRole, optionLabel);
  }

  async fillBasicSearchCriteria(searchCriteria: string) {
    await this.base.fillByRole(this.Elements.searchboxRole, this.Elements.searchNameText, searchCriteria);
    await this.base.waitForElementGetByText(searchCriteria);
  }

  async isGridEmpty(): Promise<boolean> {
    const noResults = this.page.getByText(this.Elements.noItemsText);
    await this.base.waitForElementGetByText(this.Elements.noItemsText);
    const visible = await noResults.isVisible();
    return visible;
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

  async selectDeleteIcon() {
    await this.base.waitAndClick(this.Elements.deleteIconLocator);
  }

  async fillRecordIdWithEditedText() {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const editedText = 'Edited Record ID ' + randomNumber;
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.recordIdForEditText, editedText);
    return editedText;
  }

  async fillRecordIdWithImportedDocumentText() {
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    const importedDocumentRecordIdText = 'Imported document Record ID ' + randomNumber;
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.recordIdText, importedDocumentRecordIdText);
    return importedDocumentRecordIdText;
  }

  async waitForElementGetByText(text: string) {
    await this.base.waitForElementGetByText(text);
  }

  async waitForDeletedDocumentoToDisappear(text: string) {
    await this.base.waitForElementToDisappearByText(text);
  }

  async clickSave() {
    await this.base.waitForElementGetByRole(this.Elements.buttonRole, this.Elements.saveEditButtonName);
    await this.base.waitAndClickGetByRoleExact(this.Elements.buttonRole, this.Elements.saveEditButtonName, true);
  }

  async clickDelete() {
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, this.Elements.deleteIconName);
    await this.base.waitForElementToDisappearByRole(this.Elements.buttonRole, this.Elements.deleteIconName);
  }

  async clickSaveAndClose() {
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, this.Elements.saveAndCloseName);
  }

  async waitAndClickImportDocumentButton(){
    await this.base.waitAndClick(this.Elements.importDocumentButton);
  }

  async waitAndClickDropdownLUEGType(LUEGType: string) {
    await this.base.waitAndClick(this.Elements.dropdownLUEGTypeLocator);
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.searchNameText, LUEGType);
    await this.base.waitAndClickGetByText(LUEGType);
  }

  async waitAndClickDropdownLUEGSubtype(LUEGSubtype: string) {
    await this.base.waitAndClick(this.Elements.dropdownLUEGSubtypeLocator);
    await this.base.fillByRole(this.Elements.textboxRole, this.Elements.searchNameText, LUEGSubtype);
    await this.base.waitAndClickGetByText(LUEGSubtype);
  }

}