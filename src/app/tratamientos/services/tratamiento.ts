// tratamiento.service.ts
import { Injectable } from "@angular/core";
import { tratamiento } from "../interfaces/tratamiento";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class TratamientoService {

  public tratamientos: tratamiento[] = [];

  constructor(private http: HttpClient) {}

  fetchTratamientoFromApi(searchTerm: string): Observable<any> {
    console.log("buenas noches");
    return this.http.get(`http://localhost:8081/api/Tratamientos?searchTerm=${searchTerm}`)
  }

  createTratamiento(tratamiento: tratamiento): Observable<any> {
    return this.http.post("http://localhost:8081/api/Tratamientos", tratamiento);
  }

  updateTratamiento(tratamiento: tratamiento): Observable<any> {
    const url = `http://localhost:8081/api/Tratamientos`;
    // const { title, title2, textTratamiento, image } = tratamiento;
    return this.http.put(url, tratamiento);
  }

  deleteTratamiento(tratamiento: tratamiento): Observable<any> {
    const url = `http://localhost:8081/api/Tratamientos/${tratamiento.id}`;
    return this.http.delete(url);
  }
  getTratamientoDetails(id: Number): Observable<any> {
    const url = `http://localhost:8081/api/Tratamientos/details/${id}`;
    return this.http.get(url);
  }

  ordernarNombreDescente(): void {
    this.tratamientos.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
  }
  ordernarNombre() : void{
    this.tratamientos.sort((a,b)=>{
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
});
}
}

    // public tratamientos: tratamiento[] =[];

    // constructor(private http: HttpClient){

    // }
    
    // fetchTratamientoFromApi(searchTerm: string): Observable<any>{
    //   return this.http.get(`http://localhost:8081/api/tratamientos?searchTerm=${searchTerm}`);
    // }
    // createTratamiento(tratamiento: tratamiento) : Observable<any>{
    //     // const headers = this.createHeaders();
    //     return this.http.post("http://localhost:8081/api/tratamientos", tratamiento, {});
    // }
    // updateTratamiento(tratamiento: tratamiento): Observable<any> {
    //     const url = `http://localhost:8081/api/tratamientos/${tratamiento.id}`;
    //     const {title, title2, textTratamiento, image} = tratamiento;
    // //   const headers = this.createHeaders();
    //   return this.http.put(url, {title, title2, textTratamiento, image});
    // }
  
    // deleteTratamiento(tratamiento: tratamiento): Observable<any> {
    //     const url = `http://localhost:8081/api/tratamientos/${tratamiento.id}`;
    //     return this.http.delete(url);
    //     // const headers = this.createHeaders();
    //     // return this.http.delete(`http://localhost:8081/api/tratamientos/${tratamientoToDelete.id}`, {headers}.pipe(
    //         // switchMap(()=>this.fetchTratamientoFromApi(""))
    //     // ));
    // }
    // public ordernarNombreDescente() : void{
    //     this.tratamientos.sort((a,b)=>{
    //       if (a.title > b.title) return -1;
    //       if (a.title < b.title) return 1;
    //       return 0;
    //     });
    //     }
    //     // public createHeaders(): HttpHeaders {
    //     //     const token = this.authService.getToken();
    //     //     console.log(token)
    //     //     return new HttpHeaders({
    //     //       'Authorization': token || ''
    //     //     });
    //     //   }
