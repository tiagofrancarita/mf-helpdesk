import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css'],
  //
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis : [],
    dataCriacao:''
  };

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
    this.tecnico = resposta;})
  }

  delete(): void {
      this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico excluído com sucesso!', 'Exclusão de técnicos');
      this.router.navigate(['tecnicos']);
    }, ex => {
        if(ex.error.erros){
          ex.error.erros.forEach(element => {
            this.toast.error(element.message, 'Exclusão de técnicos'); 

        });
    }
  })
}

}
