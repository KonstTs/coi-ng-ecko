import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PfDashboardViewModelService } from './dashboard-viewmodel.service';
import { PF_DASHBOARD_COLUMNS as dbc, IPF_DASHBOARD_MODE, IPfDashboardLayoutType, PF_DASHBOARD_LAYOUT_MODES as pflm } from './dashboard-config';
import { IPfTableBaseColdef, PfTableComponent } from "../../shared/structure/table/table.component";
import { CommonModule } from '@angular/common';
import { PfTextComponent } from '../../shared/input/text/text.component';
import { Observable, of } from 'rxjs';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PF_TABLE_COLDEFS_TOKEN } from '../../shared/structure/table/table-viewmodel.service';
import { IPfSelectOptions, PfSelectComponent } from "../../shared/input/select/select.component";
import { SelectMapperService } from '../../shared/services/select-mapper.service';
import {COIN_ORDER_QUERY_PARAMS as cop} from '../../../app/views/dashboard/dashboard-config';
import { currency } from '../../config/table';
import { PF_DASHBOARD_FILTERS, PF_TABLE_FILTER_MODEL_TOKEN } from '../../config/filter-defs';
import { FormsModule } from '@angular/forms';
import { SESSIONSTORAGE_CACHE } from '../../config/cache';
import { PfBrowserCacheService } from '../../shared/services/browser-cache.service';
import { PfHorizontalScrollerDirective } from '../../shared/directives/horizontal-scroll.directive';
import { PfChartComponent } from '../../shared/structure/charts/pf-chart.component';


@Component({
  standalone: true,
  imports: [
    PfTableComponent, 
    CommonModule, 
    PfSelectComponent,
    FormsModule,
    PfHorizontalScrollerDirective,
    // PfChartComponent
   ],
  providers: [
      PfDashboardViewModelService, 
      SelectMapperService, 
      SESSIONSTORAGE_CACHE,
      {provide: PF_TABLE_FILTER_MODEL_TOKEN, useValue: PF_DASHBOARD_FILTERS},
      {provide: PF_TABLE_COLDEFS_TOKEN, useValue: dbc}],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <div class="dashboard --docked" [ngClass]="layout['hostClass']">

      <section class="card --coins">
        <div class="_header">
          <div class="pf-ai-jc-center-flex --title">
            <h2 class="pf-mrgr10">{{titleCoins}}</h2>
            <input 
              #filterCtrl  
              matInput
              class="pf-table-filter-input"
              (keyup)="PfTable.onFilter($event)"
            >
          </div>
          <div class="pf-ai-jc-center-flex --filters">
            <pf-select 
              [label]="'Columns'" 
              [options]="columnsMap"
              [multiple]="true" 
              [(ngModel)]="VM.displayedColumns"
            >
            </pf-select>
            <pf-select 
              style="width: 120px;"
              [label]="'Currency'" 
              [optionsFn$]="currencies$"
              [(ngModel)]="VM.filterModel.vs_currency" 
              (ngModelChange)="search$($event)"
            >
            </pf-select>
            <pf-select 
              style="width: 180px;"
              [label]="'Order'" 
              [options]="orderOptions" 
              [(ngModel)]="VM.filterModel.order" 
              (ngModelChange)="search$($event)"
            >
            </pf-select>
          </div>
        </div>    

        <pf-table
          [VM]="VM"
          [filterable]="true"
          [sticky]="true"
          [pagination]="true"
          [pagesize]="250"
        ></pf-table>
      </section>

      <section class="card --dock">
        <div class="_header pf-motion" (click)="provideLayout('default')">
          <h2 class="_title">{{titleCharts}}</h2>
        </div>    
        <div class="_charts pf-motion-fast">

         <!-- <pf-chart></pf-chart> -->

        </div>
      </section>
  </div>
  `
})
export class PfDashboardComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild(PfTableComponent) PfTable: PfTableComponent;

  titleCoins = 'Coins';
  titleCharts = 'Charts';
  searchLabel = ''
  columns: IPfTableBaseColdef[];
  columnsMap: any;
  displayedColumns: string[];
  layout: IPfDashboardLayoutType;
  modes: IPF_DASHBOARD_MODE;
  orderOptions: IPfSelectOptions[];

  search$: (e: any) => Observable<PfCoin[]>
  currencies$: () => Observable<string[]>

  constructor(
    public VM:PfDashboardViewModelService, 
    @Inject(SelectMapperService) private _selectMapperSvc:SelectMapperService
    
  ){
    this.modes = pflm;
    this.provideLayout('default');
    this.orderOptions = cop;
    this.columnsMap = this.VM.columns.map((c, i) => ({label:c.header, value:c.columnDef}));
    console.log('this.VM:', this.VM)

    this.search$ = (e) => {
      return this.VM.search(e);
    }

    this.currencies$ = () => {
      return this._selectMapperSvc.currencies() as any
    }

    // this.VM.getRows({}).subscribe()
  }


  provideLayout(type: string) {
    if (this.layout?.id === type) return;
    this.layout = (<any>this.modes)[type];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
  }
}



// <section class="pf-height pf-jc-center-flex pf-coloumn-flex">