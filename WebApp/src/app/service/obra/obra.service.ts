import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from './obra';

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private baseUrl = `${config.obterUrl()}/books`;

  constructor(private http: HttpClient) { }

  get(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.baseUrl}`);
  }

  getId(id: any): Observable<Obra> {
    return this.http.get<Obra>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Obra> {
    return this.http.put<Obra>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Obra> {
    return this.http.post<Obra>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
