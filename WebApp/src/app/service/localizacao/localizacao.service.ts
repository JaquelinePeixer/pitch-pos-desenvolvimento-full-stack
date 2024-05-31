import { Injectable } from '@angular/core';
import { Localizacao } from './localizacao';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  private baseUrl = `${config.obterUrl()}/locations`;

  constructor(private http: HttpClient) { }

  get(): Observable<Localizacao[]> {
    return this.http.get<Localizacao[]>(`${this.baseUrl}`);
  }

  getId(id: any): Observable<Localizacao[]> {
    return this.http.get<Localizacao[]>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Localizacao> {
    return this.http.put<Localizacao>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Localizacao> {
    return this.http.post<Localizacao>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
