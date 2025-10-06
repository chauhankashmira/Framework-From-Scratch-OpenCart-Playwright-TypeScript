
/*Test Case: Login with valid credentials
    Tags: @master @sanity @regression

    Steps:
    1. Navigate to application URL
    2. Navigate to LoginPage via HomePage
    3. Enter valid credentials and log in
    4. Verify successful login by checking 'My Account' page presence
        
*/

import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';


//Step: 1 add global variables
    let config : TestConfig;
    let homePage : HomePage;
    let loginPage : LoginPage;
    let myAccountPage : MyAccountPage;


//Step 2: Add beforeEach hook which will run before each test
test.beforeEach (async ({page}) => {
    config = new TestConfig ();   //load config(URL, credentials)
    await page.goto(config.appUrl); //navigate to base URL


    //Step 3: Initialize Page Objects
   homePage = new HomePage (page);
   loginPage = new LoginPage (page);
   myAccountPage = new MyAccountPage (page);

});


//Step 4: Clean-up after each test with afterEach hook (optional)
test.afterEach(async ({page}) => {
    await page.close();  //close browser tab (good practice in local/dev)

});   

test ('User login test @master @sanity @regression', async () => {
    
    await homePage.clickMyAccount();  
    await homePage.clickLogin();  //navigate to Login Page via Home Page

    await loginPage.login(config.email, config.password); //enter valid credentials and log in


    /*
    //Another method
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin(); */

    
    const isLoggedIn = await myAccountPage.isMyAccountPageExists(); //verify logged in successfully by checking 'My Account' page

    expect(isLoggedIn).toBeTruthy()


})
