import { Component } from '@angular/core';
import { CitaService } from './services/hazTuCita';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Cita } from './interfaces/cita';

@Component({
  selector: 'app-haz-tu-cita',
  templateUrl: './haz-tu-cita.component.html',
  styleUrls: ['./haz-tu-cita.component.css']
})
export class HazTuCitaComponent {
  public idN: Number = 10;
  public newCita: Cita = { "_id": '', "NombreCompleto": '', "Telefono": 0, "Especialidad": '', "Fecha": '', "Hora": '', "Comentarios": '' };
  // public selectedTratamiento: number | null = null;
  // public newTratamientoUpdate: tratamiento = { "id": 0, "title": '', "title2": '', "textTratamiento": '', "image": '' };
  public searchTerm: string = "";
  showMessage: boolean = false;
  messageText: string = '';
  todasCitas: Cita[] = [];
  public mostrar: boolean = false;
  isAdmin: boolean = false;

  constructor(private citaService: CitaService, public userService: UserService, public authService: AuthService) {
    this.searchCita();
    this.getTodasCitas();
    console.log(this.searchCita);
  }
  private getTodasCitas(): void {
    this.citaService.getTodasCitas().subscribe(
      (response: any) => {
        this.todasCitas = response.todasCitas;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteCita(_id: string): void {
    console.log('Deleting cita with ID:', _id);
    if (confirm('¿Estás seguro de que deseas borrar este tratamiento?')){
    this.citaService.eliminarCita(_id).subscribe(
      (response: any) => {
        console.log(response.msg);
        // Actualizar la lista de citas después de eliminar
        this.getTodasCitas();
      },
      (error: any) => {
        console.log(error);
      }
    );
    }
  }
  
  // eliminarCita(id: Number): void {
  //   this.citaService.eliminarCita(id).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this.getTodasCitas(); // Actualizar la lista después de eliminar
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

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

  public get cita(): Cita[] {
    console.log("hola",this.citaService.cita);
    return this.citaService.cita;

  }

  public searchByTerm(): void {
    this.searchCita(this.searchTerm);
  }
  public createCita(): void {
    // Verificar disponibilidad del horario
    this.citaService.checkDisponibility(this.newCita.Fecha, this.newCita.Hora).subscribe(
      (response: any) => {
        if (!response.isAvailable) {
          // Horario no disponible, mostrar mensaje y no crear la cita
          console.log(response.message);
          this.showMessage = true;
          this.messageText = "Cita no agendada correctamente, horario no disponible.";
        } else {
          // Horario disponible, proceder a crear la cita
          this.citaService.createCita(this.newCita).subscribe(
            {
              next: (response: any) => {
                console.log(response);
                this.newCita = { _id: '', NombreCompleto: '', Telefono: 0, Especialidad: '', Fecha: '', Hora: '', Comentarios: '' };
                this.searchCita();
                this.showMessage = true;
                this.messageText = "Cita agendada correctamente.";
              },
              error: (error: any) => {
                console.log("Error al crear la cita:", error);
              }
            }
          );
        }
      },
      (error: any) => {
        console.log("Error al verificar disponibilidad:", error);
      }
    );
  }
 
  // private insertCita(): void {
  //   this.citaService.createCita(this.newCita).subscribe(
  //     {
  //       next: (response: any) => {
  //         console.log(response);
  //         this.newCita = { id: 0, NombreCompleto: '', Telefono: 0, Especialidad: '', Fecha: '', Hora: '', Comentarios: ''  };
  //         this.searchCita();
  //       },
  //       error: (error: any) => {
  //         console.log(error)
  //       }
  //     }
  //   );
  // }
 



  private searchCita(searchTerm: string = ""): void {
    this.citaService.fetchCitaFromApi(searchTerm).subscribe(
      {
        next: (response: any) => {
          console.log("sueño",response);
          this.citaService.cita = response.TratamientoList;
          console.log("adios",this.citaService.cita)
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }
}
