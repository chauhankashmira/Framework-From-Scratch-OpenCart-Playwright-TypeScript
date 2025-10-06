
//LoginPge Object Class

import {Page, expect, Locator} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    //Locators
    private readonly txtEmailAddress: Locator;
    private readonly txtPassword : Locator;
    private readonly btnLogin : Locator;
    private readonly txtErrorMessage : Locator;
    
constructor (page: Page) {
    this.page = page;

    //Initialize locators with CSS selectors
    this.txtEmailAddress = page.locator("#input-email");
    this.txtPassword = page.locator("#input-password");
    this.btnLogin = page.locator("input[value='Login']");
    this.txtErrorMessage = page.locator(".alert.alert-danger.alert-dismissible");

    }

    //Action Methods:

    //Email address on Login page - parameter email
    async setEmail (email:string) {
        await this.txtEmailAddress.fill(email);
    }

    //Password on Login page - parameter pwd
    async setPassword (pwd:string) {
        await this.txtPassword.fill(pwd);

    }

    //Click Login Button  
    async clickLogin () {
        await this.btnLogin.click();

    }
   
    //Performs complete login action (all function names)
    async login(email:string, password:string) {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();

    }


    // Error message
     async getloginErrorMessaage (): Promise <null | string > {
        return (this.txtErrorMessage.textContent())

     } 

}

   