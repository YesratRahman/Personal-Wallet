import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userName = new FormControl('', [Validators.required]);
  getErrorStatus(){
    if(this.userName.hasError('required')){
      return 'Enter a valid name'; 
    }
    return this.userName.hasError('userName') ? 'Not a valid name' : ''; 
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
