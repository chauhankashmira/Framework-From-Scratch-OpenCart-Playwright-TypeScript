
/*Test Case: User Logout *tags @master @regression

//Steps:
1. Open application URL
2. Navigate to Login page through Home page
3. Login using valid credentials
4. Verify "My Account" page
5. Click on Logout
6. Click on Continue button
7. Verify redirection to Home page

*/


import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";;
import { LogoutPage } from "../pages/LogoutPage";

import { TestConfig } from "../test.config";


//Declare Shared Variables

let config : TestConfig;
let homePage : HomePage;
let myAccountPage : MyAccountPage;
let loginPage : LoginPage;
let logoutPage : LogoutPage;


//Add Hook - beforeEach

test.beforeEach( async ({page}) => {

    config = new TestConfig(); //Load test config
    await page.goto(config.appUrl); //Step: 1  Open application URL
    
    //Initialize Page Objects
    homePage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);

})

//afterEach hook
    
test.afterEach(async ({page}) => {
    await page.close(); //helps to keep tests clean

})


//Start test case steps (Scenario)

test ("User Logout Scenario @master @regression", async () => {

    
    await homePage.clickMyAccount();
    await homePage.clickLogin();  //Step 2: Navigate to Login Page through Home Page

    await loginPage.login(config.email, config.password) //Step 3: Login using Valid Credentials

    expect (await myAccountPage.isMyAccountPageExists()).toBeTruthy(); //Step 4: Verify successful login

    logoutPage = await myAccountPage.clickLogout(); //Step 5: Click Logout which returns LogoutPage Instance

    expect (await logoutPage.isContinueButtonVisible()).toBe(true); //Step 6: Verify "Continue" Button is visible before clicking
    
    homePage = await logoutPage.clickContinue();
    expect (await homePage.isHomePageExists()).toBe(true); //Step 7: Click Continue and Verify Redirection to Home Page

});