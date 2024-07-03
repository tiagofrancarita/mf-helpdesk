import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css'],
})
export class ClienteDeleteComponent {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis : [],
    dataCriacao:''
  };

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
    this.cliente = resposta;})
  }

  delete(): void {
      this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente excluído com sucesso!', 'Exclusão de clientes');
      this.router.navigate(['clientes']);
    }, ex => {
        if(ex.error.erros){
          ex.error.erros.forEach(element => {
            this.toast.error(element.message, 'Exclusão de Clientes'); 

        });
      }
    })
  }
}