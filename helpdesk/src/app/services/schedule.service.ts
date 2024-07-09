import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  checkChamadosAbertosHa7DiasOuMais(): Observable<boolean> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<boolean>(`${API_CONFIG.baseUrl}/v1/chamados/verificaChamadosAbertosHa7DiasOuMais`, { headers });
  }
}