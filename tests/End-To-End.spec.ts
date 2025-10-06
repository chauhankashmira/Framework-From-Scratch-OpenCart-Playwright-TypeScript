
/*
Test Case: End to End Test on OpenCart E-commerce Application 
           * Complete User flow on E-commerce site 
           * No need to add hooks in the actual end to end test
           * Need to hardcode password and at the end need to write return email to log in again after registration and logged out
           * Need to create separate function for all steps of test case and call that functions in one test block       

         Steps:
           1. Register new account (create function)
           2. Logout after registration (create function)
           3. Login with same account (create function)
           4. Search for product and add to shopping cart (create function)
           5. Verify cart contents (create function)
           6. Attempt checkout (it is disabled on demo site)  
*/


import { Page, test, expect } from "@playwright/test";

import { HomePage} from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LogoutPage } from "../pages/LogoutPage";

import { TestConfig } from "../test.config"; //to get url
import { RandomDataUtil } from "../utils/randomDataGenerator"; //to generate random data


//This is main Test Block which runs entire workflow

test("End to End Testing @end-to-end", async ({page}) => {
  const config = new TestConfig();
  await page.goto(config.appUrl); //open application

  let registrationEmail: string = await performRegistration (page);  //Step 1
  console.log('Registration is completed!');

  await performLogout (page); //Step 2 - log out after registration
  console.log('Logout is completed!');

  await performLogin (page, registrationEmail); //Step 3 - log in again with same credentials created during registration
  console.log('Login is completed!');

  await addProductToCart (page); //Step 4
  console.log('Product added to cart!');
  
  await verifyShoppingCart (page); //Step 5
  console.log('Shopping cart verification is completed!');

  //await performCheckout (page); //Step 6 - not applicable in demo site

});


//Functions for all test steps:

/*Step 1: Below whole Function created to Register New User Account
        : HomePage */

async function performRegistration (page: Page) : Promise <string> {
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();  //click My Account
    await homePage.clickRegister();   //click Register 

    const registrationPage = new RegistrationPage(page);
    await registrationPage.setFirstName(RandomDataUtil.getFirstName()); //fill first name
    await registrationPage.setLastName(RandomDataUtil.getLastName());  //fill last name
    
    let email:string = RandomDataUtil.getEmail();
    await registrationPage.enterEmail(email);  //fill email
    await registrationPage.enterTel (RandomDataUtil.getPhoneNumber()); //fill phone number

    await registrationPage.enterPassword("test@123"); //fill password //hardcoded password to log in again with same details
    await registrationPage.confirmPassword("test@123"); //fill confirm password

    await registrationPage.policyCheckbox(); //checked privacy policy checkbox
    await registrationPage.continueButton(); //submit registration form
    
    
    const confirmationMsg = await registrationPage.confirmationMessage ();
    expect (confirmationMsg).toContain('Your Account Has Been Created!'); //validation of registration
    
    
    return email; //return email needed after registration logged out and to log in again with same email

}


/*Step 2: Function to log out the current user
        : MyAccountPage + Homepage (redirection) */

  async function performLogout (page: Page) {
    
    const myAccountPage = new MyAccountPage(page);

    const logoutPage : LogoutPage = await myAccountPage.clickLogout();

    expect(await logoutPage.isContinueButtonVisible()).toBe(true); //validation of continue button

    const homePage = await logoutPage.clickContinue(); //click continue
    expect (await homePage.isHomePageExists()).toBe(true);  //redirection to home page

  }

/* Step 3: Function to log in using registered email
         : TestConfig + HomePage + LoginPage + MyAccount */

  async function performLogin (page: Page, email: string) {

    const config = new TestConfig();
    await page.goto(config.appUrl); //reload page

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();
  
    const loginPage = new LoginPage(page);
    await loginPage.login(email, "test@123"); //log in 

    const myAccountPage = new MyAccountPage(page);
    expect (await myAccountPage.isMyAccountPageExists()).toBe(true); //verify log in by checking My Account page

  }


  /*Step 4: Function to search for product and add it to cart
          : TestConfig + HomePage + SearchResultsPage + ProductPage (inside searchResultsPage) */

  async function addProductToCart (page: Page) {

    const config = new TestConfig();
    const productName:string = config.productName;
    const productQuantity:string = config.productQuantity;

    
    const homePage = new HomePage(page);
    await homePage.enterProductName(productName); //enter product name
    await homePage.searchButton(); //click on search button

    
    const searchResultsPage = new SearchResultsPage(page);
    expect (await searchResultsPage.isSearchResultsPageExists()).toBe(true); //validate search results page
    expect (await searchResultsPage.isProductExist(productName)).toBe(true); //validate product exist in search result page

    
    const productPage = await searchResultsPage.selectProduct(productName); //select product
    await productPage?.setQuantity(productQuantity); //set quantity
    await productPage?.addToCart(); //add to cart


    await page.waitForTimeout (3000); //wait for few seconds and then verify below

    expect (await productPage?.isConfirmationMessageVisible()).toBe(true); //confirm product added to cart

  } 


/*Step 5: Function to verify the Shopping Cart
        : ProductPage + ShoppingCartPage + TestConfig */

 async function verifyShoppingCart (page: Page) {

    const productPage = new ProductPage(page);

    //Navigate to shopping cart from product page 
    await productPage.clickItemsToNavigateToCart();
    const shoppingCartPage: ShoppingCartPage = await productPage.clickViewCart();


    const config = new TestConfig();
    expect (await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice); //validate total price is correct based on config

};


//Step 6: Function to perform checkout (not applicable in demo site)

/*async function performCheckout (page: Page) {

  //checkout feature is not implemented as it is demo site
   
} */