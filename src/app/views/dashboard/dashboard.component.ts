import { AfterViewInit, Component, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { PfDashboardViewModelService } from './dashboard-viewmodel.service';
import { PF_DASHBOARD_BASE_QUERY, PF_DASHBOARD_COLUMNS as dbc } from '../../config/table';
import { IPfTableBaseColdef, PfTableComponent } from "../../shared/structure/table/table.component";

export const PF_DASHBOARD_BASE_QUERY_TOKEN = new InjectionToken<any>('PF_DASHBOARD_BASE_QUERY');

@Component({
  standalone: true,
  providers:[
    PfDashboardViewModelService, 
    {provide: PF_DASHBOARD_BASE_QUERY_TOKEN, useValue: PF_DASHBOARD_BASE_QUERY}
  ],
  template: `
    <section>
        <h1>{{title}}</h1>
        <pf-table
           [VM]="VM"
           [columns]="columns"
        ></pf-table>
    </section>
  `,
  styles: [ 

  ],
  imports: [PfTableComponent]
})
export class PfDashboardComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'Coins';
  descr!:string;
  columns!:IPfTableBaseColdef[]
  displayedColumns!:string[];

  constructor(public VM:PfDashboardViewModelService){
    this.columns = [...dbc];
    this.displayedColumns = this.columns.map(({columnDef}) => columnDef)
    console.log('this.columns:', this.columns)
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
}
