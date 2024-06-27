import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from '../../models/credenciais';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


logar() {
    this.service.autheticate(this.creds).subscribe(response => {
      this.toast.info('Logado com sucesso');
      this.service.sucessFullLogin(response.headers.get('Authorization')!.substring(7));
      this.router.navigate(['']);
    }, () => {  
      this.toast.error('Email ou senha inválidos');
      this.creds.email = '';
      this.creds.senha = '';
    })
  }


  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}