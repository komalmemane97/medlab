import { Component,ElementRef,ViewChild } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { UtilityService } from 'src/app/core/utility.service'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  count!:number;
  action:string = "Login";
  isLoggedInUser:boolean = false;
  userDetails:any;
  @ViewChild("closeBtn") closeBtn!:ElementRef;

  constructor(private cart:CartService,private utility:UtilityService){

  }

  ngOnInit(){
   this.cart.cartCountObs$.subscribe({
     next:(resp:any)=>{
       this.count = resp;
     }
   })

   this.getCartItems();
    let details = this.utility.getUserDetails();
    if(details != null){
     this.isLoggedInUser = true;
     this.userDetails = details;
    }
    console.log(this.closeBtn)
  }

 getCartItems() {
  let cartItems = this.cart.getCartDataFromLocalStorage();
  this.count = cartItems.length;
 }

 changeAction(actionName:string){
   this.action = actionName;
 }

 getAction(data: any) {
   this.isLoggedInUser = data;
   if (this.isLoggedInUser) {
     this.userDetails = this.utility.getUserDetails();
   //  console.log(this.loginModal.nativeElement, "modal");
     this.closeBtn.nativeElement.click();
   }
 }

 logout(){
   this.isLoggedInUser = false;
   localStorage.removeItem("userDetails");
   localStorage.removeItem("token");
 }

 ngAfterViewInit(){
 //  console.log("loginModal",this.loginModal);
 }
}