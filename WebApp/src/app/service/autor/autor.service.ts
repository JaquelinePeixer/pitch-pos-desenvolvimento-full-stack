import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config';
import { Observable } from 'rxjs';
import { Autor } from './autor';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
 private baseUrl = `${config.obterUrl()}/authors`;

  constructor(private http: HttpClient) { }

  get(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.baseUrl}`);
  }

  getId(id: any): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Autor> {
    return this.http.post<Autor>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
