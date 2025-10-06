//ProductPage Object Class

import { Page, Locator, expect} from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage"; 

export class ProductPage {

    private readonly page: Page;

    private readonly txtQuantity : Locator;
    private readonly btnAddToCart : Locator;
    private readonly cnfMsg : Locator;
    private readonly btnItems : Locator;
    private readonly lnkViewCart : Locator;


constructor(page:Page) {
    this.page = page;
    this.txtQuantity = page.locator('input[name="quantity"]');
    this.btnAddToCart = page.locator('#button-cart');
    this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
    this.btnItems = page.locator('#cart');
    this.lnkViewCart = page.locator('strong:has-text("View Cart")');
    }


//Sets the Product Quantity - parameter qty

    async setQuantity (qty:string) : Promise <void> {
       await this.txtQuantity.fill('');
       await this.txtQuantity.fill(qty);
};

//Add Product to Cart

    async addToCart() : Promise <void> {
        await this.btnAddToCart.click();

    }

//Check if confirmation message is visible

    async isConfirmationMessageVisible() : Promise <boolean> {
        try {

            if (this.cnfMsg != null) {
                return true;
            }
            else {
                return false;
            }

                       
        }

        catch(error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }
//Click on Items button to navigate to cart
    async clickItemsToNavigateToCart() : Promise <void> {
        await this.btnItems.click();

    }

//Click on View Cart link    
    async clickViewCart () : Promise <ShoppingCartPage> {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

//Complete workflow to add product to cart
    async addProductToCart (quantity: string) : Promise <void> {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();   

    }

}

