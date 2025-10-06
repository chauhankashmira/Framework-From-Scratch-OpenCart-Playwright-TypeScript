//MyAccountPage Object Class

import { Page, Locator, expect} from '@playwright/test';
import { LogoutPage } from './LogoutPage'; 

export class MyAccountPage {

    private readonly page : Page;

    //Locators using CSS selectors

    private readonly msgHeading : Locator;
    private readonly lnkLogout : Locator;

    //Constructor
    constructor(page: Page) {

        this.page = page;

        this.msgHeading = page.locator("h2:has-text('My Account')");
        this.lnkLogout = page.locator("text=Logout").nth(1);

    }

    //Action Methods

    //Verify if My Account Page is displayed

    async isMyAccountPageExists() : Promise <boolean> {
        
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        } 

        catch(error) {
            console.log(`Error checking My Account Page heading': ${error}`);
            return false;
        }

    }


    //Click Logout link

    async clickLogout () : Promise <LogoutPage> {
        try {
            await this.lnkLogout.click();
            return new LogoutPage (this.page);
        }

        catch(error) {
            console.log(`Unable to click logout link: ${error}`);
            throw error;
        }
    }
    
    //Alternative method to return page exists using Title
     
     async getPageTitle() : Promise<string> {
        return (this.page.title ());

     }

   
} 