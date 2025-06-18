import { type Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrappers';

export default class LoginPage {

  private base: PlaywrightWrapper;

  constructor(private page: Page){
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    textBoxRole: "textbox",
    buttonRole: "button",
    userNameText: "Username",
    passwordText: "Password",
    loginButtonText: "Login",
    errorMessageText: "Invalid username or password."
  }

  async goto(BASEURL: string){
    await this.base.goto(BASEURL);
  }

  async fillUserName(text: string){
    await this.base.fillByRole(this.Elements.textBoxRole, this.Elements.userNameText, text);
  }

  async fillPassword(text: string){
    await this.base.fillByRole(this.Elements.textBoxRole, this.Elements.passwordText, text);
  }

  async waitAndClickLoginButton(){
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, this.Elements.loginButtonText);
  }

  async getErrorMessageText(){
    return await this.base.getByText(this.Elements.errorMessageText);
  }

  async getHomePage(BASEURL: string, userText: string, passwordText: string){
    await this.base.goto(BASEURL);
    await this.base.fillByRole(this.Elements.textBoxRole, this.Elements.userNameText, userText);
    await this.base.fillByRole(this.Elements.textBoxRole, this.Elements.passwordText, passwordText);
    await this.base.waitAndClickGetByRole(this.Elements.buttonRole, this.Elements.loginButtonText);
  }

}