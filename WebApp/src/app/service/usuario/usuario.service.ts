import { Injectable } from '@angular/core';
import { config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { PageSize } from '@domain/pagination/pagesize.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = `${config.obterUrl()}/users`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  get(page?: number, params?: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page ?? 0}&pageSize=${this.pageSize}`, { params });
  }

  getId(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  getByToken(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/getByToken`);
  }

  getByCpf(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/cpf/${cpf}`);
  }

  put(id: any, data: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, data);
  }

  putEditUser(id: any, data: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/edit-user/${id}`, data);
  }

  post(data: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getObrasEmprestadaPorUsuario(page?: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user-bookloan?page=${page ?? 0}&pageSize=${this.pageSize}&sort=returnDate,desc`);
  }
}
