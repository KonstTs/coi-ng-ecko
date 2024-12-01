import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PfDashboardViewModelService } from './dashboard-viewmodel.service';
import { PF_DASHBOARD_COLUMNS as dbc, PF_DASHBOARD_LAYOUT_MODES as mode } from './dashboard-config';
import { IPfTableBaseColdef, PfTableComponent } from "../../shared/structure/table/table.component";
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [PfTableComponent, AsyncPipe],
  providers: [PfDashboardViewModelService],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <div class="dashboard -docked">

      <section class="card -coins">
        <div class="_header">
          <h2 class="_title">{{titleCoins}}</h2>
          <!-- <mat-form-field> -->
            <!-- <input matInput (keyup)="VM.search($event)" placeholder="search"> -->
          <!-- </mat-form-field> -->
        </div>    

        <pf-table
          [VM]="VM"
          [columns]="columns"
          [displayedColumns]="displayedColumns"
          [stick]="true"
        ></pf-table>
      </section>

      <section class="card -charts">
        <div class="_header">
          <h2 class="_title">{{titleCharts}}</h2>
        </div>    

      </section>
  </div>
  `
})
export class PfDashboardComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild(PfTableComponent) PfTable: PfTableComponent;
  titleCoins = 'Coins';
  titleCharts = 'Charts';
  columns:IPfTableBaseColdef[];
  displayedColumns:string[];

  constructor(public VM:PfDashboardViewModelService){
    this.columns = dbc;
    this.displayedColumns = this.columns.map(({columnDef}) => columnDef)
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
  }
}



// <section class="pf-height pf-jc-center-flex pf-coloumn-flex">