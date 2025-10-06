
//Test Case: DataDriven - Login

//Hooks not needed, as we will repeat the same test multiple times


import {test, expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";

import { TestConfig } from "../test.config"; //to get appUrl
import { DataProvider } from "../utils/dataProvider"; //to read json and csv data



//Load data from login.json file
    const jsonPath = "testdata/logindata.json"; //this is called json path
    const jsonTestData = DataProvider.getTestDataFromJson(jsonPath)

    for (const data of jsonTestData) {

        test(`Login with JSON Data: ${data.testName } @datadriven`, async ({page}) => {

            const config = new TestConfig (); //create instance
            await page.goto(config.appUrl); //get url from test.config.ts file

            const homePage = new HomePage (page);
            await homePage.clickMyAccount();
            await homePage.clickLogin();


            const loginPage = new LoginPage (page);
            await loginPage.login(data.email, data.password);    

            if (data.expected.toLowerCase() === 'success') {

            const myAccountPage = new MyAccountPage(page);
            const isLoggedin = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
            
            }

            else {
            const errorMessage = await loginPage.getloginErrorMessaage();
            expect (errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.")
            

            }

        })

    } 



//Load data from login.csv file
    const csvPath = "testdata/logindata.csv"; //this is called csv path
    const csvTestData = DataProvider.getTestDataFromCSV(csvPath)

    for (const data of csvTestData) {

        test(`Login with CSV Data: ${data.testName } @datadriven`, async ({page}) => {

            const config = new TestConfig (); //create instance
            await page.goto(config.appUrl); //get url from test.config.ts file

            const homePage = new HomePage (page);
            await homePage.clickMyAccount();
            await homePage.clickLogin();


            const loginPage = new LoginPage (page);
            await loginPage.login(data.email, data.password);    

            if (data.expected.toLowerCase() === 'success') {

            const myAccountPage = new MyAccountPage(page);
            const isLoggedin = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
            
            }

            else {
            const errorMessage = await loginPage.getloginErrorMessaage();
            expect (errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.")
            

            }

        })

    }