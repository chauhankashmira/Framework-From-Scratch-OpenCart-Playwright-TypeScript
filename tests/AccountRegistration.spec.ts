/* Test Case: Account Registration

   Tags: @master @sanity @regression

    Steps:
    1. Navigate to application URL
    2. Go to 'My Account' and click 'Register'
    3. Fill in registration details with random data
    4. Agree to Privacy Policy and submit the form
    5. Validate confirmation message

*/

//import class Names from file names given while creating
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage} from '../pages/RegistrationPage';
import { RandomDataUtil} from '../utils/randomDataGenerator';
import {TestConfig} from '../test.config';

test('User Registration test', async ({page}) =>{

    
    const config = new TestConfig();
    await page.goto(config.appUrl); //navigate to application url

   
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister(); //Go to My Account and click on Register

    
    //Fill details in the registration form:

    const registrationPage = new RegistrationPage(page);
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

    await page.waitForTimeout(3000);

});


