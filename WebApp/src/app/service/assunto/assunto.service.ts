import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Assunto } from './assunto';
import { Observable } from 'rxjs';
import { PageSize } from '@domain/pagination/pagesize.enum';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private baseUrl = `${config.obterUrl()}/subjects`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
  }

  getList(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/find-list`, {params: {name}});
  }

  getId(id: any): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.baseUrl}/${id}`);
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
