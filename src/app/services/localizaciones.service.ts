import { Injectable } from '@angular/core';
import { Camion } from '@core/interface/camion';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {
  myAppUrl = "http://localhost:5056" 
  myApiUrl = "/api/GPS/"
  constructor(private http: HttpClient) { }

  getLocalizacionesByEmpresa(empresa: string): Observable<Camion[]>{
    const params = new HttpParams().set("empresa", empresa);
    return this.http.get<Camion[]>(`${this.myAppUrl}${this.myApiUrl}${empresa}`, {params})
  }
  
}
