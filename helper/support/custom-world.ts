import { Page } from '@playwright/test';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import HomePage from '../../pages/homePage';
import Assert from '../wrapper/assert';
import LoginPage from '../../pages/loginPage';
import { Logger } from 'winston';

export class CustomWorld extends World {
  page!: Page;
  homePage!: HomePage;
  loginPage!: LoginPage;
  assert!: Assert;
  logger!: Logger;
  importedDocumentRecordIdText?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
