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
  private baseUrl = `${config.obterUrl()}/books-loan`;
  pageSize = PageSize.sizeDefault;

  constructor(private http: HttpClient) { }

  putByUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/renovacao`, data);
  }

  emprestimo(data: any): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.baseUrl}/emprestimo`, data);
  }

  devolucao(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/devolucao`, data);
  }
}
