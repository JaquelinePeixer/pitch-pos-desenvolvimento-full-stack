import { Injectable } from '@angular/core';
import { Localizacao } from './localizacao';
import { Observable } from 'rxjs';
import { config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { PageSize } from '@domain/pagination/pagesize.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  private baseUrl = `${config.obterUrl()}/locations`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
  }

  getId(id: any): Observable<Localizacao> {
    return this.http.get<Localizacao>(`${this.baseUrl}/${id}`);
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
