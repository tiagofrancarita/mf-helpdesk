import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.maxLength(11));
  email: FormControl = new FormControl(null, [Validators.minLength(3), Validators.email]);
  senha: FormControl = new FormControl(null, [Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]);
  dataCriacao: FormControl = new FormControl(null, Validators.required);

  hide = true;

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    
  }

  create(): void {
    this.cliente.dataCriacao = new Date().toISOString();
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro de clientes');
      this.router.navigate(['clientes']);
    }, ex => {
      if (ex.error.erros) {
        ex.error.erros.forEach(element => {
          this.toast.error(element.message, 'Cadastro de clientes');
        });
      }
    });
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid && this.dataCriacao.valid;
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}