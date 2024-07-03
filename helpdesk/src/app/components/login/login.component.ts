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
  senha = new FormControl(null, Validators.minLength(3));

  hide = true;

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      const authHeader = resposta.headers.get('Authorization');
      if (authHeader) {
        this.service.successfulLogin(authHeader.substring(7));
        this.toast.success('Login efetuado com sucesso!', 'Login');
        this.router.navigate(['']);
      } else {
        console.error('Erro ao autenticar. Cabeçalho de autorização não encontrado.');
        this.toast.error('Erro ao autenticar. Cabeçalho de autorização não encontrado.', 'Login');
      }
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}