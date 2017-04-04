import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
          this.authService.storeUserData(data.token, data.user);
         /* this.flashMessage.show('You are now logged in', {
            cssClass: 'alert-success',
            timeout: 3000
          });*/
          console.log("You are now logged in");
          this.router.navigate(['/dashboard']);
      } else {
         /* this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 3000
          });*/
          console.log(data.msg);
          this.router.navigate(['login']);
      }
    });
  }
}
