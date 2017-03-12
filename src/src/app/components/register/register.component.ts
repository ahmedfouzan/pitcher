import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IMyOptions, IMyDate, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  d = new Date();

  name: String;
  username: String;
  email: String;
  password: String;
  gender: String;
  dob: Object = {date: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1}};

  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
        inline: false,
        disableSince: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()}
    };

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      gender: this.gender,
      dob: this.dob
    }
    console.log(user);

    //Required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate dob
    if(!this.dob){
      this.flashMessage.show('Please enter a valid date', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
  }


}
