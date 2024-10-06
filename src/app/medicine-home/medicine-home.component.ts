import { Component } from '@angular/core';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.css']
})
export class MedicineHomeComponent {

  pincode: string = "33333";
  city: string = "Jaipur";
  
  searchText:string="";

  searchSubject:any;
  medicines:any;

  constructor(private api: ApiService) {

  }
  
  ngOnInit(){
    this.searchSubject.pipe(
      this.api.getDataFromServer("top-deals?name="+this.searchText)
    ).subscribe({
      next:(response:any)=>{
        console.log("response",response);
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
          }
        },
        error: () => {

        }
      })
    }

  }

  searchProducts(){
    if(this.searchText.trim()==''){
      this.medicines=[];

    }
    else{
      this.searchSubject.next(this.searchText);
    }
  }
}