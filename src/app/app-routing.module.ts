import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { TratamientosPage } from './tratamientos/tratamientos.page';
import { GaleriaComponent } from './galeria/galeria.component';
import { HazTuCitaComponent } from './haz-tu-cita/haz-tu-cita.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes =[

  {path: "Inicio", component: InicioComponent},
  {path: "SobreNosotros", component: SobreNosotrosComponent},
  {path: "Tratamientos", component: TratamientosPage},
  {path: "Galeria", component: GaleriaComponent},
  {path: "HazTuCita",component: HazTuCitaComponent, canActivate:[AuthGuard]},
  {path: "Registrate", component: RegistrateComponent},
  {path: "login", component: LoginComponent},
  {path:"not-found", component:NotFoundComponent},
  {path: "**", redirectTo: "not-found", pathMatch:"full"}
  
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
