import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamientoComponent } from './tratamiento/tratamiento/tratamiento.component';
import { TratamientosListComponent } from './tratamientos/tratamientos-list/tratamientos-list.component';
import { TratamientosPage } from '../tratamientos.page';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TratamientoComponent,
    TratamientosListComponent,
    TratamientosPage,
  ],
  exports: [
    TratamientosListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TratamientoModule { }
