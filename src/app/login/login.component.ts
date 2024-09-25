import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = true;
  userError: boolean = false; // Variable para manejar el estado de error
  passwordError: boolean = false; // Variable para manejar el estado de error
  error: boolean = false; 
  constructor( private authService: AuthService, private router: Router){}

  public user: string = "";
  public password: string = "";
  login(): void {
    this.userError = false;
    this.passwordError = false;
    this.error = false;
  
    this.authService.login(this.user, this.password).subscribe(
      data => {
        this.authService.setToken(data.token);
        this.authService.setActiveUser(data.user);
        this.goInicio();
      },
      error => {
        console.log("Datos incorrectos, Intenta de nuevo", error);
  
        if (error.status === 401) {
          if (error.error.message === "Invalid username") {
            this.userError = true;
          } else if (error.error.message === "Invalid password") {
            this.passwordError = true;
          } else {
            this.error = true;
          }
        } else {
          this.error = true;
        }
      }
    );
  }
  private goInicio(): void {
    // Cambiamos el routelink
    this.router.navigate(['./HazTuCita']);
  }
}
