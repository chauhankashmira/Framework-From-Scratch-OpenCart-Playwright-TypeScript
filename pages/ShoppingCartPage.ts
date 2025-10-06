//ShoppingCartPage Object Class

import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage"; 

export class ShoppingCartPage {
    
    private readonly page: Page;
    
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;

constructor(page: Page) {
    this.page = page;
        
    this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
    this.btnCheckout = page.locator("a[class='btn btn-primary']");

};


//Get the total price from the shopping cart
  
  async getTotalPrice (): Promise<string | null> {
 
       try {
        
        return await this.lblTotalPrice.textContent();
        
        }
        
        catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }


//Click on the Checkout button
     
  async clickOnCheckout () : Promise <CheckoutPage> {
        
    await this.btnCheckout.click();
     return new CheckoutPage(this.page);
    
    }

//Verify if shopping cart page is loaded
    
  async isPageLoaded () : Promise <boolean> {

    try {
      
        return await this.btnCheckout.isVisible();
    
      }
      
      catch (error) {
            return false;
        }
    }
};