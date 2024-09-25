import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router de Angular
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
// import { AuthService } from '../user.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent {
  // isLogin: boolean = true;
  constructor( private authService: AuthService, private router: Router){}

  public validacionUsuario: string = "";
  public validacionCamposLlenos: string = "";
  public user: string = "";
  public password: string = "";
  // public validation: string = "";

  // loginData = {
  //   username: '',
  //   password: ''
  // };

  userRegister = {
    user: '',
    password: '',
    NombreCompleto: '',
    correoElectronico: '',
  };


  private goInicio(): void {
    // Cambiamos el routelink
    this.router.navigate(['./HazTuCita']);
  }
  // Validateregister(): void{
  //   this.validacionUsuario = "";
  //   this.validacionCamposLlenos = "";
  //   if(this.user == "" || this.password == ""){
  //     this.validacionCamposLlenos = "is-invalid";
  //     return;
  //   }
  //   this.register();
  // }

  register(): void {
    this.authService.register(this.userRegister.user, this.userRegister.password, this.userRegister.NombreCompleto, this.userRegister.correoElectronico).subscribe(
      data => {
        // console.log(data);
        this.authService.setToken(data.token);
        this.authService.setActiveUser(data.user);
        this.goInicio();
      },
      error => {
        console.log(error);
      }
    );
  }

}
