import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';
import saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(    
    private http: HttpClient,
    private authService: AuthService) { }

    //'http://localhost:8080/api-helpdesk'

  gerarRelatorioClientes(): Observable<Blob> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${API_CONFIG.baseUrl}/v1/relatorios/gerarRelatorioClientes`, { headers, responseType: 'blob' });
  }

  gerarRelatorioTecnicos(): Observable<Blob> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${API_CONFIG.baseUrl}/v1/relatorios/gerarRelatorioTecnicos`, { headers, responseType: 'blob' });
  }

  baixarRelatorio(blob: Blob, filename: string): void {
    const file = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, filename);
  }

}