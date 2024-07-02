import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent implements OnInit {


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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
    this.tecnico = resposta;
    })
  }


  

  update(): void {
    this.tecnico.perfis = this.tecnico.perfis.map(perfil => this.convertPerfilToCode(perfil));
    this.tecnico.dataCriacao = new Date().toISOString();
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso!', 'Atualização de técnicos');
      this.router.navigate(['tecnicos']);
    }, ex => {
        if(ex.error.erros){
          ex.error.erros.forEach(element => {
            this.toast.error(element.message, 'Atualização de técnicos'); 

        });
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}
