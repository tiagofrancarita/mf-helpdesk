import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Subscription, interval, switchMap } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent  implements OnInit {

  constructor() { }


  ngOnInit(): void {
   
  }


}