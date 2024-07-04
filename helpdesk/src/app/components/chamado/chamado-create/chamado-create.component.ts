import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: 'ALTA', // Inicialize com um valor padrão válido
    statusEnum: 'ABERTO', // Inicialize com um valor padrão válido
    titulo: '',
    observacoes: '',
    tecnico: { id: 0, nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: '' },
    cliente: { id: 0, nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: '' },
    descricaoChamado: ''
  };

  nomeCliente: string = '';
  nomeTecnico: string = '';

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridadeEnum: FormControl = new FormControl(null, [Validators.required]);
  statusEnum: FormControl = new FormControl(null, [Validators.required]);
  tituloChamado: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);
  descricaoChamado: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(
      resposta => {
        console.log(this.chamado);
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados']);
      },
      ex => {
        console.log(ex);
        this.toastService.error(ex.error.error);
      }
    );
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(
      resposta => {
        this.clientes = resposta;
      }
    );
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(
      resposta => {
        this.tecnicos = resposta;
      }
    );
  }

  validaCampos(): boolean {
    return this.prioridadeEnum.valid && this.statusEnum.valid && this.tituloChamado.valid
      && this.observacoes.valid && this.tecnico.valid && this.cliente.valid;
  }
}