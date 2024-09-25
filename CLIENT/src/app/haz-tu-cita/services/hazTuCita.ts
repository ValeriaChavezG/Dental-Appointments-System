// tratamiento.service.ts
import { Injectable } from "@angular/core";
// import { tratamiento } from "../interfaces/tratamiento";
import { Observable, tap, catchError,of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Cita } from "../interfaces/cita";

@Injectable({ providedIn: "root" })

export class CitaService {
  public cita: Cita[] = [];

  constructor(private http: HttpClient) {}

  fetchCitaFromApi(searchTerm: string): Observable<any> {
    console.log("buenas noches");
    return this.http.get(`http://localhost:8081/api/HazTuCita?searchTerm=${searchTerm}`)
  }

  createCita(cita: Cita): Observable<any> {
    return this.http.post("http://localhost:8081/api/HazTuCita", cita);
  }
  checkDisponibility(Fecha: String, Hora: String): Observable<any> {
    return this.http.get(`http://localhost:8081/api/HazTuCita/checkDisponibility?fecha=${Fecha}&hora=${Hora}`);
  }
  getTodasCitas(): Observable<any> {
    return this.http.get("http://localhost:8081/api/HazTuCita/obtener");
  }
  
  eliminarCita(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:8081/api/HazTuCita/obtener/${_id}`)
    .pipe(
      tap(response => console.log('Delete response:', response)),
      catchError(error => {
        console.error('Error deleting cita:', error);
        throw error;
      })
    );
  }
}
