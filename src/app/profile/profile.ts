import { Component } from '@angular/core';
import { Tools } from '../tools';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
public userInfo:object={}; 
  constructor(public service:Tools){}

  ngOnInit(): void {
    this.service.getUser().subscribe((data:any)=>{
      console.log(data); 
      this.userInfo=data.firstName; 
      console.log("info", this.userInfo)
    })
    
  }
}
