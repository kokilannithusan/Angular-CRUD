import { Component, OnInit } from '@angular/core';
import { DBservice } from '../../API_KIT.service/db.service';
import { signUpModel } from '../login/jason.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  signUpModelObj: signUpModel = new signUpModel();
  getData: any;
  constructor(private DB: DBservice) { }
  ngOnInit(): void {
    this.getSiugnupData();
  }
  getSiugnupData() {
    this.DB.getSiugnup(this.signUpModelObj).subscribe(res => {
      this.getData = res;


    })
  }
  deleteSignupData(id: number) {
    this.DB.deleteSignup(id).subscribe(data => {
      alert("Query data deleted sucessfully")
    })
  }
}
