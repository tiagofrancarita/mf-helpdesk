import { Component, ViewChild, OnInit } from '@angular/core';
import { Chamado } from '../../../models/chamado';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css'],
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Mapas para os enums
  statusMap: { [key: string]: string } = {
    'ABERTO': 'ABERTO',
    'EXECUÇÃO': 'EXECUÇÃO',
    'ENCERRADO': 'ENCERRADO',
    'CANCELADO': 'CANCELADO',
    'DEVOLVIDO': 'DEVOLVIDO'
  };

  prioridadeMap: { [key: string]: string } = {
    'BAIXA': 'BAIXA',
    'MEDIA': 'MÉDIA',
    'ALTA': 'ALTA',
    'CRITICA': 'CRÍTICA'
  };

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      console.log('Resposta da API:', resposta); // Adiciona log para verificar a resposta da API
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(statusEnum: string): string {
    console.log('Status Enum:', statusEnum); // Adiciona log para verificar o valor do enum
    return this.statusMap[statusEnum] || 'STATUS DESCONHECIDO';
  }

  retornaPrioridade(prioridade: string): string {
    console.log('Prioridade Enum:', prioridade); // Adiciona log para verificar o valor do enum
    return this.prioridadeMap[prioridade] || 'PRIORIDADE DESCONHECIDA';
  }

  orderByStatus(statusEnum: string): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.statusEnum == statusEnum)
        list.push(element);
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
}