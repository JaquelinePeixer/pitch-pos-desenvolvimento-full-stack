import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Assunto } from './assunto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private baseUrl = `${config.obterUrl()}/subjects`;

  constructor(private http: HttpClient) { }

  get(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.baseUrl}`);
  }

  getId(id: any): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Assunto> {
    return this.http.post<Assunto>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
