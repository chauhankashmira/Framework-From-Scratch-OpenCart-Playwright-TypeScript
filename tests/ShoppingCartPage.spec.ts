
/*Test Case: Add Product to Shopping Cart
        tags: @master @regression

        Steps:
        1. Open application URL
        2. Enter available product name in search box
        3. Click search button
        4. Verify search results page is displayed
        5. Verify product appears in search results
        6. Select the product
        7. Set quantity
        8. Add product to cart
        9. Verify success message
*/

import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
//import { ShoppingCartPage  } from "../pages/ShoppingCartPage";

import { TestConfig } from "../test.config";


//Declare Page Objects
let config : TestConfig;
let homePage : HomePage;
let productPage : ProductPage;
let searchResultsPage : SearchResultsPage;


//beforeEach Hook

test.beforeEach(async ({page}) => {

    config = new TestConfig; //Load test configuration
    await page.goto(config.appUrl); //Step 1: Open application URL

    homePage = new HomePage (page);
    productPage = new ProductPage (page);
    searchResultsPage = new SearchResultsPage (page);

})

//afterEach Hook

test.afterEach(async ({page}) => {
    await page.close();

})

test("Add Product to Shopping Cart @master @regression", async () => {

await homePage.enterProductName(config.productName); //Step 2: Enter available product name in search box

await homePage.searchButton(); //Step 3: Click search button 

expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy(); //Step 4: Verify search results page is displayed

const productName = config.productName; 
expect(await searchResultsPage.isProductExist(productName)).toBeTruthy(); //Step 5: Verify product appears in search results


if (await searchResultsPage.isProductExist(productName)) {
    
    await searchResultsPage.selectProduct(productName); //Step 6: Select product
    await productPage.setQuantity(config.productQuantity); //Step 7: Set quantity
    await productPage.addToCart(); //Step 8: Add product to cart

    expect (await productPage.isConfirmationMessageVisible()).toBeTruthy(); //Step 9: Verify success message
}

});