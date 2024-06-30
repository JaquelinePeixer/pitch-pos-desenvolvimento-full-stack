import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from './obra';
import { PageSize } from '../../domain/pagination/pagesize.enum';

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private baseUrl = `${config.obterUrl()}/books`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
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
