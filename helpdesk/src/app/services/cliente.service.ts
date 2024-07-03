import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) { }

  findById(id: any): Observable<Cliente> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/v1/clientes/buscarCliente/${id}`, { headers });
  }

  findAll(): Observable<Cliente[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/v1/clientes/listarClientes`, { headers });
  }

  create(cliente: Cliente): Observable<Cliente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/v1/clientes/cadastrarCliente`, cliente, { headers });
  }

  update(cliente: Cliente): Observable<Cliente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/v1/clientes/atualizarCliente/${cliente.id}`, cliente, { headers });
  }
  
  delete(id: any): Observable<Cliente> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/v1/clientes/deletaCliente/${id}`, { headers });
  }
}