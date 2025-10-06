
import {Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {

    private readonly page: Page; 
    private readonly btnContinue : Locator;
    
    
    constructor(page:Page) {

        this.page = page;
        
        this.btnContinue = page.locator(".btn.btn-primary");

    }

    //Click continue button after Logout

    async clickContinue () : Promise <HomePage> {
        await this.btnContinue.click();
        return new HomePage (this.page);

    }


    //Verify Continue Button is visible

    async isContinueButtonVisible () : Promise<boolean> {
        return await this.btnContinue.isVisible();   

    }

}