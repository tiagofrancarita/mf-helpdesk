import { Component } from '@angular/core';
import { RelatorioService } from '../../../services/relatorio.service';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrl: './gerar-relatorio.component.css'
})
export class GerarRelatorioComponent {

  constructor(private relatorioService: RelatorioService) { }

  gerarRelatorioClientes(): void {
    this.relatorioService.gerarRelatorioClientes().subscribe(blob => {
      const filename = `rel-clientes-${this.formatDate(new Date())}.xlsx`;
      this.relatorioService.baixarRelatorio(blob, filename);
    });
  }

  gerarRelatorioTecnicos(): void {
    this.relatorioService.gerarRelatorioTecnicos().subscribe(blob => {
      const filename = `rel-tecnicos-${this.formatDate(new Date())}.xlsx`;
      this.relatorioService.baixarRelatorio(blob, filename);
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  }
}
