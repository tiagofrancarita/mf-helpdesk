import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],

})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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


  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {}


  create(): void {

    this.tecnico.dataCriacao = new Date().toISOString();

    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro de técnicos');
      this.router.navigate(['tecnicos']);
    }, ex => {
        if(ex.error.erros){
          ex.error.erros.forEach(element => {
            this.toast.error(element.message, 'Cadastro de técnicos'); 

        });
    }
  })
}

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid && this.dataCriacao.valid;
  }

}