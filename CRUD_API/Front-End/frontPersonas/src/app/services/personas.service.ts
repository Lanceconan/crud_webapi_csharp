import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personas } from '../models/Personas';

@Injectable()
export class PersonasService {

  apiDirection: string = 'http://localhost:59554/api/Personas/';

  constructor(private http: HttpClient) {}

  getAllPersonas(): Observable<Personas[]>{
    return this.http.get<Personas[]>(this.apiDirection);
  }

  getPersonaById(id: string): Observable<Personas>{
    return this.http.get<Personas>(this.apiDirection + id);
  }

  updatePersona(persona: Personas){
    let headers = new HttpHeaders({ "content-type": "application/json" });
    return this.http.put<any>(this.apiDirection + persona.id, persona, { headers: headers });
  }

  createPersona(persona: Personas){
    let headers = new HttpHeaders({ "content-type": "application/json" });
    return this.http.post<any>(this.apiDirection + persona.id, persona, { headers: headers });
  }

  deletePersona(id: string){
    return this.http.delete<any>(this.apiDirection + id);
  }
}
