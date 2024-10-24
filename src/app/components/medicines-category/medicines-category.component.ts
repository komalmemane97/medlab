import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { ApiService } from 'src/app/core/api.service';
import { UtilityService } from 'src/app/core/utility.service';

@Component({
  selector: 'app-medicines-category',
  templateUrl: './medicines-category.component.html',
  styleUrls: ['./medicines-category.component.css']
})
export class MedicinesCategoryComponent {
  medicinesList: any;
  pincodeDetails: any;
  cartItems:any=[];
  constructor(private api: ApiService,private utility:UtilityService,private cart:CartService) {

  }
  ngOnInit() {
    this.pincodeDetails = this.utility.getPinCodeDetails();
    this.getMedicinesByCategory();
  }
  getMedicinesByCategory() {
    this.api.getDataFromServer("top-deals-by-category").subscribe({
      next: (response: any) => {
         if(response && response.length > 0){
          this.medicinesList=response;
         }
      },
    error:(error)=>{
    console.log(error);
    }
    })
  }
   addProductToCart(productObj:any){
     this.cart.addToCart(productObj);
   }

  
  // addToCart(productObj: any){
          
    
  //        if(productObj){
  //        this.cartItems = this.cart.getCartDataFromLocalStorage();
  //          this.cartItems.push(productObj);
  //          let carItemsStr = JSON.stringify(this.cartItems);
  //          localStorage.setItem("cart",carItemsStr);
  //          this.cart. sendCartCount(this.cartItems.length);
  //       }
  //     }
}
