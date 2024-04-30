import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { signUpModel } from './jason.model';
import { DBservice } from '../../API_KIT.service/db.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  signUpModelObj: signUpModel = new signUpModel() // JSON model data constructor model
  type1: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  getData: any;

  loginForm!: FormGroup;



  constructor(private fb: FormBuilder, private DB: DBservice, private router: Router) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      userName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    })
    // this.getSiugnupData();
    this.loginForm = this.fb.group({

      userName1: ["", Validators.required],
      password1: ["", Validators.required]

    })

  }

  //post signup data 
  postSignUpData() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)

      this.signUpModelObj.firstName = this.signupForm.value.firstName;
      this.signUpModelObj.userName = this.signupForm.value.userName;
      this.signUpModelObj.contactNumber = this.signupForm.value.contactNumber;
      this.signUpModelObj.lastName = this.signupForm.value.lastName;
      this.signUpModelObj.gender = this.signupForm.value.gender;
      this.signUpModelObj.password = this.signupForm.value.password;

      this.DB.postSignup(this.signUpModelObj).subscribe(res => {
        console.log(res);
        alert("Data stored sucessfully")
        this.signupForm.reset();
      })
    } else {
      this.validate(this.signupForm);
      alert("Your form is invalid")
    }
  }
  getSiugnupData() {
    this.DB.getSiugnup(this.signUpModelObj).subscribe(res => {
      this.getData = res;

      // Authendication function
      const loginCheck = res.find((getData: any) => {
        return getData.userName === this.loginForm.value.userName1 && getData.password === this.loginForm.value.password1
      });
      if (loginCheck) {
        alert("Login success");
        this.loginForm.reset();
        // Navigation
        this.router.navigate(["/home"])
      }
      else { alert("User not found") }
    })
  }



  // Valiudatiuon
  private validate(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl ){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validate(control)
      }
    })
  }

  // Password hide and unhide
  hidedShowPwd() {
    this.isText = !this.isText;//Chnage value as true 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type1 = "text" : this.type1 = "password";
    //show password          => hide psw
  }
}
