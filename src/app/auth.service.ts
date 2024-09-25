import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: "root"
})


export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_ACTIVE = 'active_user';

    constructor(private http: HttpClient, private router: Router) { }

    //Método para inicar sesión
    public rol: string = "";

    login(user: string, password: string): Observable<any> {
        const body = { user, password };
        return this.http.post<any>('http://localhost:8081/api/auth/login', body);
    }
    //Terminar la sesión
    logout(): void{
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/Inicio'])
        // this.rol = "";
        localStorage.removeItem(this.USER_ACTIVE);
    }

    isAuthenticate(): boolean{
        return localStorage.getItem(this.TOKEN_KEY) !== null;
    }

    getToken(): string | null{
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void{
        window.localStorage.setItem(this.TOKEN_KEY, token);
    }

    setActiveUser(user: string): void{
        localStorage.setItem(this.USER_ACTIVE, user);
    }

    getActiveUser(): string | null{
        return localStorage.getItem(this.USER_ACTIVE);
    }
    getRole(): string | null {
        const token = this.getToken();
        console.log('Token:', token);
     
        if (!token) {
          return null;
        }
     
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          console.log('Decoded Token:', decodedToken);
          return decodedToken?.id || null;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
     
    //Método para registrar un usuario

    register(user: string, password: string, NombreCompleto: string, correoElectronico: string) {
        const body = { user, password, NombreCompleto, correoElectronico};
        return this.http.post<any>('http://localhost:8081/api/auth/Registrate', body);
    }

    //Obtengo el item de aquí para ver si el usuario está en sesión
    isLogged():boolean{
        if(localStorage.getItem(this.TOKEN_KEY)){
            return true;
        }else{
            return false;
        }
    }

    isAdmin():Observable<any>{
        const token = this.getToken();
        if(!token){
            return of(null);
        }

        return this.http.get<any>('http://localhost:8081/api/auth/isAdmin', {
            headers: {
                Authorization: token,                
            }
        });
    }
    getUserId(): string | null {
        const token = this.getToken();
     
        if (!token) {
          return null;
        }
     
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const decodedToken1=decodedToken.id
          return decodedToken1;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
    
}
