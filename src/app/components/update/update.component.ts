import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { updateModel } from '../login/jason.model';
import { ActivatedRoute } from '@angular/router';
import { DBservice } from '../../API_KIT.service/db.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  updateModelObj: updateModel = new updateModel();
  updateID : any;

  constructor(private AR: ActivatedRoute,private DB:DBservice){}

  ngOnInit(): void {
      this.updateID = this.AR.snapshot.paramMap.get('id')
      console.log('ID'+ this.updateID);
  
      this.DB.getSignupById(this.updateID).subscribe((data : any)=>{
        this.updateModelObj = data;
        console.log(data);
      })
    
}
}
