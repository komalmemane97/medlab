import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.css']
})
export class TopDealsComponent {
topDeals:any=[];

   constructor(private api:ApiService){

   }
   ngOnInit(){
     this.getTopDeals();
   }
   getTopDeals(){
  this.api.getDataFromServer("top-deals").subscribe({
    next:(response:any)=>{
         if(response && response.length > 0){
         this.topDeals=response;
            }
    },
    error:(error:any)=> {
      
    }
  })
   }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


}
