// tratamientos-list.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { tratamiento } from 'src/app/tratamientos/interfaces/tratamiento';
import { TratamientoService } from 'src/app/tratamientos/services/tratamiento';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-tratamientos-list',
  templateUrl: './tratamientos-list.component.html',
  styleUrls: ['./tratamientos-list.component.css']
})
export class TratamientosListComponent {
  public idN: Number = 10;
  public newTratamiento: tratamiento = { "id": 0, "title": '', "title2": '', "textTratamiento": '', "image": '' };
  public selectedTratamiento: number | null = null;
  public newTratamientoUpdate: tratamiento = { "id": 0, "title": '', "title2": '', "textTratamiento": '', "image": '' };
  public searchTerm: string = "";
  public mostrar: boolean = false;
  isAdmin: boolean = false;

  constructor(private tratamientoService: TratamientoService, public userService: UserService, public authService: AuthService) {
    this.searchTratamientos();
    console.log(this.searchTratamientos);
  }

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.assignUserRole()
  }
  private assignUserRole(): void {
    const role = this.authService.getRole();
    console.log('Role:', role);    
    this.isAdmin = role === 'admin';  
    this.userService.setAdminStatus(this.isAdmin);
  }

  public get tratamientos(): tratamiento[] {
    console.log("hola",this.tratamientoService.tratamientos);
    return this.tratamientoService.tratamientos;

  }

  public ordernarNombreDescente(): void {
    this.tratamientoService.ordernarNombreDescente();
  }
  public ordernarNombre(): void {
    this.tratamientoService.ordernarNombre();
  }

  public searchByTerm(): void {
    this.searchTratamientos(this.searchTerm);
  }

  public createTratamiento(): void {
    this.tratamientoService.createTratamiento(this.newTratamiento).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.newTratamiento = { id: 0, title: '', title2: '', textTratamiento: '', image: '' };
          this.searchTratamientos();
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    );
  }
  public updateTenis(): void {
    console.log(this.newTratamientoUpdate);
 
    this.tratamientoService.updateTratamiento(this.newTratamientoUpdate).subscribe({
      next: (response: any) => {
        console.log(response);
 
        this.newTratamientoUpdate = {
          "id": 0,
          "title": "",
          "title2": "",
          "textTratamiento": "",
          "image":""
        };
 
        },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public updateTratamiento(): void {
    if (this.selectedTratamiento) {
      console.log('Selected Tratamiento ID:', this.selectedTratamiento);

      this.tratamientoService.updateTratamiento(this.newTratamientoUpdate).subscribe(
        {
          next: (response: any) => {

            console.log("trata",response);
            console.log("Tratamiento a actualizar", this.selectedTratamiento);
            this.selectedTratamiento = null;
            this.searchTratamientos();
            // this.mostrarFormularioCrear();
          },
          error: (error: any) => {
            console.log("Error updating tratamiento:", error);
          }
        }
      );
    }
  }

  public deleteTratamiento(tratamiento: tratamiento): void {
    if (confirm('¿Estás seguro de que deseas borrar este tratamiento?')) {
      this.tratamientoService.deleteTratamiento(tratamiento).subscribe({
        next: (response: any) => {
          console.log(response);
          this.searchTratamientos(); // Recargar la lista después de borrar
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
  public loadTratamientoDetails(): void {
    if (this.selectedTratamiento !== null) {
      this.tratamientoService.getTratamientoDetails(this.selectedTratamiento).subscribe(
        {
          next: (TratamientoDetails: any) => {
            console.log('Cargar detalles:', TratamientoDetails);
            this.newTratamientoUpdate.id =  TratamientoDetails.id;
            this.newTratamientoUpdate.title =  TratamientoDetails.title;
            this.newTratamientoUpdate.title2 = TratamientoDetails.title2;
            this.newTratamientoUpdate.image = TratamientoDetails.image;
            this.newTratamientoUpdate.textTratamiento = TratamientoDetails.textTratamiento;
 
          },
          error: (error: any) => {
            console.error( error);
          }
        }
      );
    }
  }

  private searchTratamientos(searchTerm: string = ""): void {
    this.tratamientoService.fetchTratamientoFromApi(searchTerm).subscribe(
      {
        next: (response: any) => {
          console.log("sueño",response);
          this.tratamientoService.tratamientos = response.TratamientoList;
          console.log("adios",this.tratamientoService.tratamientos)
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }
}

