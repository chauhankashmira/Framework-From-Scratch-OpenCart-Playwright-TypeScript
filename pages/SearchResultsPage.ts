//SearchResultsPage Object Class

import { Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class SearchResultsPage {
    private readonly page: Page;

    private readonly searchPageHeader : Locator;
    private readonly searchProducts : Locator;

constructor(page:Page) {

    this.page = page;
    this.searchPageHeader = page.locator("#content h1");
    this.searchProducts = page.locator("h4>a");

};    

//Verify if Search Results page exists by checking header text
    async isSearchResultsPageExists () : Promise <boolean> {

      try {
       const headerText = await this.searchPageHeader.textContent();
       return headerText?.includes("Search - ") ?? false; //ternary operator: verify true or false
      }
      catch (error) {
        return false;
      }  

   };

//Check if product exists in the search results by its name - parameter productName

async isProductExist(productName: string) : Promise <boolean> {

  try {
    
    const count = await this.searchProducts.count();
    for (let i = 0; i < count; i++) {
     const product = this.searchProducts.nth(i);
      const title  = await product.textContent();
      
      if (title === productName) {
        return true;
      }

    }  

  }
  
  catch (error) {
    console.log(`Error checking product existence: ${error}`);
} 
  return false;
};
//Select product from search results by its name - parameter productName

async selectProduct (productName : string) : Promise < ProductPage | null > {
  try {
     const count = await this.searchProducts.count();

     for(let i = 0; i < count; i++) {
          const product = this.searchProducts.nth(i);
          const title = await product.textContent();

        if (title === productName) {
          await product.click();
          return new ProductPage(this.page);

        }  

     }

  }
    catch (error) {
      console.log(`Error checking product existence: ${error}`);

    }

  return null;

};

//Get count of the product in search results

async getProductCount () : Promise <number> {

    return await this.searchProducts.count();
}

};