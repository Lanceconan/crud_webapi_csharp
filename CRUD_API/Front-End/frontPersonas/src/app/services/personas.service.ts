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
}
