import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) { }

  findAll(): Observable<Tecnico[]> {
    const token = this.authService.getToken(); // Obtém o token do AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/v1/tecnicos/listarTecnicos`, { headers });
  }

}