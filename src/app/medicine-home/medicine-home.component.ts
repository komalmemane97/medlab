import { Component } from '@angular/core';
import { ApiService } from '../core/api.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { UtilityService } from '../core/utility.service';



@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.css']
})
export class MedicineHomeComponent {

  pincode: string = "33333";
  city: string = "Jaipur";
  
  searchText:string="";
  medicines:any = [];
  
  searchSubject:Subject<string> = new Subject<string>();


  constructor(private api: ApiService,private utility:UtilityService) {

  }


  ngOnInit(){
  
  this.searchSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((query:string)=> this.api.getDataFromServer("top-deals?description_like="+this.searchText))
   ).subscribe({
    next:(response:any)=>{
       console.log("response ",response);
      //mock the response 
      if(response && response.length > 0){
        this.medicines = response;
      }else {
        this.medicines = [];
      }
    },
    error:()=>{

    }
   })

  }


  searchCityByPincode() {
    if (this.pincode.trim().length === 6) {
      const endPoint = "get-pincode-details?pincode=" + this.pincode;
      console.log(endPoint);
      this.api.getDataFromServer(endPoint).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response && response.length > 0){
           this.city = response[0].pincodeCity
           this.utility.setPinCodeDetails(response[0]);
          }
        },
        error: () => {

        }
      })
    }

  }

  searchProducts(){
    if(this.searchText.trim() == ''){
        this.medicines = [];
    }else {
       this.searchSubject.next(this.searchText); 
   
    }
  }

}