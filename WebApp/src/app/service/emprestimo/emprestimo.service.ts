import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageSize } from '@domain/pagination/pagesize.enum';
import { Emprestimo } from './emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private baseUrl = `${config.obterUrl()}/bookloan`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
  }

  getId(id: any): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.baseUrl}/${id}`);
  }

  put(id: any, data: any): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.baseUrl}/${id}`, data);
  }

  post(data: any): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
