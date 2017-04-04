import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { IMyOptions, IMyDate, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { Router } from '@angular/router';

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
  cpassword: String;
  gender: String;
  dob: IMyDateModel
  
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
    width: '210px',
    inline: false,
    selectionTxtFontSize: '16px',
    inputValueRequired: true,
    minYear: 1901,
    disableSince: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()}
  };

  private placeholder: string = 'Select a date';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) {
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
      dob: this.dob.formatted
    }

    //Required fields
    if(!this.validateService.validateRegister(user)){
     /* this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});*/
     console.log("Please fill in all the fields");
      return false;
    }

    // Check username unavailabilitiy
    if(this.checkUsername(null)){
      /*this.flashMessage.show('Username unavailable', {cssClass: 'alert-danger', timeout: 3000});*/
      console.log("Username unavailable");
      return false;
    }

    // Validate password
    if(!this.validateService.confirmPassword(this.password, this.cpassword)){
     /* this.flashMessage.show('Passwords don\'t match', {cssClass: 'alert-danger', timeout: 3000});*/
     console.log("Passwords don't match");
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)){
      /*this.flashMessage.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 3000});*/
      console.log("Please enter a valid email");
      return false;
    }

    // Validate dob
    if(!user.dob){
      /*this.flashMessage.show('Please enter a valid date', {cssClass: 'alert-danger', timeout: 3000});*/
      console.log("Please enter a valid date");
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        /*this.flashMessage.show('Successfully registered', {cssClass: 'alert-success', timeout: 3000});*/
        console.log(data.msg);
        this.router.navigate(['/login']);
      }else {
       /* this.flashMessage.show('Couldn\'t register' , {cssClass: 'alert-danger', timeout: 3000});*/
        console.log(data.msg);
        this.router.navigate(['/register']);
      }
    });
  }

  checkUsername(event){

    if(this.username == ""){
          event.target.parentElement.className = 'form-group';
          document.getElementById('username-glyphicon').className = '';
    }else{
      // Check username
      this.authService.checkUsername(this.username).subscribe(data => {
        console.log(data);
        if(data.success){
          if(event != null){
            event.target.parentElement.className = 'form-group has-success has-feedback';
            document.getElementById('username-glyphicon').className = 'glyphicon glyphicon-ok form-control-feedback';
          }
          console.log(data.success);
          return true;
        }else {
          if(event != null){
            event.target.parentElement.className = 'form-group has-error has-feedback';
            document.getElementById('username-glyphicon').className = 'glyphicon glyphicon-remove form-control-feedback';
          }
        }
      });
    }
    return false;
  
  }

  confirmPassword(event){

    if(this.cpassword == ""){
        event.target.parentElement.className = 'form-group';
        document.getElementById('cpassword-glyphicon').className = '';
    }else{
      if(this.validateService.confirmPassword(this.password, this.cpassword)){
          event.target.parentElement.className = 'form-group has-success has-feedback';
          document.getElementById('cpassword-glyphicon').className = 'glyphicon glyphicon-ok form-control-feedback';
        }else {
          event.target.parentElement.className = 'form-group has-error has-feedback';
          document.getElementById('cpassword-glyphicon').className = 'glyphicon glyphicon-remove form-control-feedback';
        }
    }
  
  }


}
