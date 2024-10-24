import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup
  displayErrorMsg: boolean = false;

  @Output()
  emitAction:EventEmitter<boolean> = new EventEmitter(); 


  constructor(private fb: FormBuilder, private api: ApiService) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    let params = new HttpParams()
      .set("email", this.loginForm.get('email')?.value)
      .set("password", this.loginForm.get('password')?.value)

    this.api.getDataFromServer("users").subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.displayErrorMsg = false;
          const token = "Heqweqw12r43swerwerew";
          localStorage.setItem("userDetails",JSON.stringify(response[0]));
          localStorage.setItem("token",token);
          this.emitAction.emit(true);
        } else {
          this.displayErrorMsg = true;
          this.emitAction.emit(false);
        }
      },
      error: (error: any) => {

      }
    })

  }

}