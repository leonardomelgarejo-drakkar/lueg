import { expect, Page } from "@playwright/test";

export default class Assert {

    constructor(private page: Page) { }

    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(title: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(title);
    }

    async assertElementContains(element: string, text: string) {
        expect(element).toContain(text);
    }

    async assertTrue(condition: boolean, message?: string) {
        expect(condition, message).toBe(true);
    }

    async assertFalse(condition: boolean, message?: string) {
        expect(condition, message).toBe(false);
    }

    async assertNull(value: any, message?: string) {
        expect(value, message).toBeNull();
    }

    async assertEmpty(value: any, message?: string) {
        expect(value, message).toBe("");
    }

}