
//HomePage Object Class

import {Page, expect, Locator} from "@playwright/test";

export class HomePage{
//locators, constructor, action methods

private readonly page: Page;

//Locators:
private readonly linkMyAccount: Locator;
private readonly linkRegister: Locator;
private readonly linkLogin: Locator;
private readonly txtSearchBox: Locator;
private readonly btnSearch: Locator; 


//Constructor:
constructor(page : Page) {
    
    this.page =  page;
    this.linkMyAccount = page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']");
    this.linkRegister = page.locator("a[href*='route=account/register']");
    this.linkLogin = page.locator("a[href*='route=account/login']");
    this.txtSearchBox = page.locator("input[placeholder='Search']");
    this.btnSearch = page.locator(".fa.fa-search"); 

};

  //Action Methods:

  //check if HomePage exists //cannot use assertion (expect) here
  
        async isHomePageExists () {

          let title:string = await this.page.title();

            if (title){
                return true;

            }
            return false;
        };    


  //click My Account Link:

        async clickMyAccount (){

            try{
               await this.linkMyAccount.click(); 
            }
            catch(error) {
                console.log(`Exception occurred while clicking 'My Account': ${error}`);

                throw error;
            }
          }; 

//click Registration Link:

        async clickRegister (){

            try{
               await this.linkRegister.click(); 
            }
            catch(error) {
                console.log(`Exception occurred while clicking 'My Account': ${error}`);

                throw error;
            }
          };  


  //Click Login Link:
         
          async clickLogin () {

            try {
                await this.linkLogin.click();
            }
            catch(error) {
                console.log(`Exception occurred while clicking 'Login': ${error}`);
            
                throw error;
            }
          };
  
  //Enter Product name in the Searchbox:

          async enterProductName (pName:string) {

            try{
              await this.txtSearchBox.fill(pName);   

            }
            catch(error) {
                console.log(`Exception occurred while entering product name: ${error}`);
                throw error;
            }
          }; 

  //Click Search Button:
            
            async searchButton () {

                try{
                  await this.btnSearch.click();
             }
             catch(error) {
                
                console.log(`Exception occurred while clicking 'Search Button': ${error}`);
                throw error;
             }
            };

  };




