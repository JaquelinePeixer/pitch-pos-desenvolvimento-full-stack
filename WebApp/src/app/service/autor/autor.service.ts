import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config';
import { Observable } from 'rxjs';
import { Autor } from './autor';
import { PageSize } from '../../domain/pagination/pagesize.enum';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
 private baseUrl = `${config.obterUrl()}/authors`;
 pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`);
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
