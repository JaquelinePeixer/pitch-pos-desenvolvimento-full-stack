import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Renovacao } from './renovacao';
import { Observable } from 'rxjs';
import { PageSize } from '../../domain/pagination/pagesize.enum';

@Injectable({
  providedIn: 'root'
})
export class RenovacaoService {
  private baseUrl = `${config.obterUrl()}/renovacao`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
  }

  getId(id: any): Observable<Renovacao> {
    return this.http.get<Renovacao>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Renovacao> {
    return this.http.put<Renovacao>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Renovacao> {
    return this.http.post<Renovacao>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
