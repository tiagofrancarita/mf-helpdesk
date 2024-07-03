import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Chamado } from '../models/chamado';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  
  constructor(private http: HttpClient,
    private authService: AuthService) { }

  findById(id: any): Observable<Chamado> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/v1/chamados/buscarChamado/${id}`, { headers });
  }

  findAll(): Observable<Chamado[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/v1/chamados/listarChamados`, { headers });
  }

  create(chamado: Chamado): Observable<Chamado> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/v1/chamados/cadastroChamado`, chamado, { headers });
  }

  update(chamado: Chamado): Observable<Chamado> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/v1/chamados/atualizaChamadoParaExecucao/${chamado.id}`, chamado, { headers });
  }
}