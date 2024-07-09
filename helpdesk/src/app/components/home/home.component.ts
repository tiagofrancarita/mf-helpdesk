import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, switchMap } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { ChamadoService } from '../../services/chamado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, OnDestroy {

  statusCounts: any;

  existemChamadosAbertos = false;
  private subscription: Subscription;

  constructor(
    private schedule: ScheduleService,
    private chamadoService: ChamadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchStatusCounts();
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling(): void {
    this.subscription = interval(60000) // 1 minute interval
    .pipe(
      switchMap(() => this.schedule.checkChamadosAbertosHa7DiasOuMais())
    )
    .subscribe(
      (response: any) => {
        if (typeof response === 'string' && response.includes('Verificação concluída com sucesso')) {
          this.existemChamadosAbertos = true;
          this.toastr.success('Existem chamados abertos há mais de 7 dias.', 'Verificação concluída com sucesso');
        } else {
          this.existemChamadosAbertos = false;
          this.toastr.info('Não existem chamados abertos há mais de 7 dias.');
        }
      },
      (error) => {
        this.toastr.error('Erro ao verificar chamados abertos.', 'Erro');
        console.error('Erro ao verificar chamados abertos:', error);
      }
    );
  }

  private stopPolling(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchStatusCounts(): void {
    this.chamadoService.getCountByStatus().subscribe(
      data => {
        this.statusCounts = data;
        console.log('Contagem de Status:', this.statusCounts);
      },
      error => {
        console.error('Erro ao buscar contagem de status:', error);
      }
    );
  }
}