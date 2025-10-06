
/*Test Case: Search Product 
       tags: @master @regression 

   Steps:
   1. Open application URL
   2. Enter product name in the search box
   3. Click on Search Button
   4. Verify product displays in search results 
   5. Validate if searched product appears in results
*/

import { test, expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

import { TestConfig } from "../test.config";


//Declare Reusable Variables
let config : TestConfig;
let homePage : HomePage;
let searchResultsPage : SearchResultsPage;


//beforeEach Hook
test.beforeEach(async ({page}) => {
    config = new TestConfig ();
    await page.goto(config.appUrl); //Step 1: Open application URL


    //Initialize Page Objects

    homePage = new HomePage (page);
    searchResultsPage = new SearchResultsPage (page);

})

//afterEach Hook
test.afterEach(async ({page}) => {
    await page.close();

})

 test ("Product Search Test @master @regression", async () => {
      let productName = config.productName;

      await homePage.enterProductName(productName); //Step 2: Enter product name in the search box
      await homePage.searchButton();  //Step 3: Click on Search Button

      expect (await searchResultsPage.isSearchResultsPageExists()).toBeTruthy(); //Step 4: Verify product displays in search results


      const isProductFound = await searchResultsPage.isProductExist(productName);
      expect (isProductFound).toBeTruthy(); //Step 5: Validate if searched product appears in results

});