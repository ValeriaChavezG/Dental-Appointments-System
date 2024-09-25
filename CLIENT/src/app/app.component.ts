import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  constructor(private router: Router, private authService: AuthService){}

  public get isTratamiento(): boolean{
    return this.router.url == "/Tratamiento";
  }
  

 
}
 
