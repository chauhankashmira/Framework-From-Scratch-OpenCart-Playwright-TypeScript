
//RegistrationPage Object Class


import {Page, expect, Locator} from "@playwright/test";

export class RegistrationPage {

     private readonly page:Page;

     //Locators using CSS selectors:

     private readonly txtFirstName: Locator;
     private readonly txtLastName: Locator;
     private readonly txtEmail: Locator;
     private readonly txtTelephone: Locator;
     private readonly txtPassword: Locator;
     private readonly txtConfirmPassword: Locator;
     private readonly chkdPolicy: Locator;
     private readonly btnContinue: Locator;
     private readonly msgConfirmation: Locator;


     //Constructor:

     constructor (page:Page) {
        this.page = page;

       //Above Locators Initialization with CSS selectors:
     
     this.txtFirstName = page.locator('#input-firstname');
     this.txtLastName = page.locator('#input-lastname');
     this.txtEmail = page.locator('#input-email');
     this.txtTelephone = page.locator('#input-telephone');
     this.txtPassword = page.locator('#input-password');
     this.txtConfirmPassword = page.locator('#input-confirm');
     this.chkdPolicy = page.locator ("input[name='agree']");
     this.btnContinue = page.locator("input[value='Continue']");
     this.msgConfirmation = page.locator("h1:has-text('Your Account Has Been Created!')");  
    
    };

    //Action Methods:  Registration form

 
    //Fill First Name, parameter fname

        async setFirstName (fname:string): Promise <void> {
                await this.txtFirstName.fill(fname);
              };

    //Fill Last Name, parameter lname

        async setLastName (lname:string) : Promise<void> {
                await this.txtLastName.fill(lname);
         };

    //Fill Email, parameter email
        
         async enterEmail(email:string): Promise <void> {
                await this.txtEmail.fill(email);
        };
        
    //Fill Telephone, parameter tel
    
          async enterTel (tel:string): Promise <void> {

            await this.txtTelephone.fill(tel);
        };
        
    //Fill Password, parameter pwd
    
            async enterPassword (pwd:string) : Promise <void> {
                await this.txtPassword.fill(pwd);

        };

     //Fill Confirm Password, parameter pwd
            async confirmPassword (pwd:string): Promise <void> {
                await this.txtConfirmPassword.fill(pwd);
        };   

     //Policy checkbox, no parameter
            async policyCheckbox (): Promise <void> {
                await this.chkdPolicy.check();
        };     

     //Click Continue button, no parameter
            async continueButton () : Promise <void> {
                await this.btnContinue.click ();
        };

     //Confirmation Message, no parameter, promise string, return statement

            async confirmationMessage () : Promise <string> {
                return await this.msgConfirmation.textContent() ?? '';
        };   
     
     
     //Complete Registration Workflow, parameter userdata - object containing registration data
     //Enter all methods individually as above or can enter all together as below: 

            async completeRegistration (userData: {
                   
                    firstName:string;
                    lastName: string;
                    email: string;
                    telephone:string;
                    password:string;
              }): Promise <void> {

                    await this.setFirstName(userData.firstName);
                    await this.setLastName(userData.lastName);
                    await this.enterEmail(userData.email);
                    await this.enterTel(userData.telephone);
                    await this.enterPassword(userData.password);

              }
     
 //https://www.udemy.com/course/learn-playwright-web-api-testing-with-typescript/learn/lecture/50578177#overview
 //1:05:06

}