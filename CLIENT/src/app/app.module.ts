import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
// import { TratamientosComponent } from './tratamientos/tratamientos.page';
import { GaleriaComponent } from './galeria/galeria.component';
import { HazTuCitaComponent } from './haz-tu-cita/haz-tu-cita.component';
// import { RegistrateComponent } from './registrate/registrate.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
// import { TratamientoComponent } from './tratamientos/components/tratamiento/tratamiento/tratamiento.component';
import { TratamientoModule } from './tratamientos/components/tratamiento.module';
import { RegistrateComponent } from './registrate/registrate.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    InicioComponent,
    SobreNosotrosComponent,
    // TratamientosComponent,
    GaleriaComponent,
    HazTuCitaComponent,
    RegistrateComponent,
    LoginComponent,
    FooterComponent,
    LoginComponent,
    // TratamientoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TratamientoModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
