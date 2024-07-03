import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css'],})
export class ClienteUpdateComponent {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis : [],
    dataCriacao:''
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
    this.cliente = resposta;
    })
  }

  update(): void {
    this.cliente.perfis = this.cliente.perfis.map(perfil => this.convertPerfilToCode(perfil));
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Atualização');
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

convertPerfilToCode(perfil: string): string {
  const perfilMap = {
      'ADMIN': '1',
      'CLIENTE': '2',
      'TECNICO': '3'
  };
  return perfilMap[perfil];
}

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }else{
      this.cliente.perfis.push(perfil);
    }
  }

  validaCamposAtualizar(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid;
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
