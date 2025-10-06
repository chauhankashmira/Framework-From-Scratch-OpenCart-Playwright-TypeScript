//Test Case: beforeEach-AccountRegistration


//import class Names from file names given while creating
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage} from '../pages/RegistrationPage';
import { RandomDataUtil} from '../utils/randomDataGenerator';
import {TestConfig} from '../test.config';

//Global variables
let homePage : HomePage;
let registrationPage : RegistrationPage;


//beforeEach hook - common steps for all test blocks within this file

    test.beforeEach(async ({page}) => {
        const config = new TestConfig();
        await page.goto(config.appUrl);
        homePage = new HomePage(page);
        registrationPage = new RegistrationPage(page);

});

//afterEach hook - not mandatory

    test.afterEach(async ({page}) => {
        await page.waitForTimeout(3000);
        await page.close();

    });

//no page fixture require from this point as we use in hooks
    test('User Registration test @master @sanity @regression', async () =>{

        
    await homePage.clickMyAccount();
    await homePage.clickRegister(); //Go to My Account and click on Register

    
    //Fill details in the registration form:

    
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.enterEmail(RandomDataUtil.getEmail());
    await registrationPage.enterTel(RandomDataUtil.getPhoneNumber());
    

    const password = RandomDataUtil.getPassword(); //need to set in variable, so that it will not generate different password for confirm password
    await registrationPage.enterPassword(password);
    await registrationPage.confirmPassword(password);
    
    
    await registrationPage.policyCheckbox(); //for checkbox for Privacy Policy 
    await registrationPage.continueButton(); // click on continue button

    //validate confirmation message

    const confirmationMsg = await registrationPage.confirmationMessage();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    
});


