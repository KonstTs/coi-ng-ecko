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


@Component({
  standalone: true,
  imports: [
    PfTableComponent, 
    CommonModule, 
    PfSelectComponent
  ],
  providers: [
      PfDashboardViewModelService, 
      SelectMapperService, 
      {provide: PF_TABLE_FILTER_MODEL_TOKEN, useValue: PF_DASHBOARD_FILTERS},
      {provide: PF_TABLE_COLDEFS_TOKEN, useValue: dbc}],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <div class="dashboard --docked" [ngClass]="layout['hostClass']">

      <section class="card --coins">
        <div class="_header">
          <div class="pf-ai-jc-center-flex --title">
            <h2>{{titleCoins}}</h2>
          </div>
          <div class="pf-ai-jc-center-flex --filters">
            <input class="pf-table-filter-input" #filterCtrl matInput (keyup)="PfTable.onFilter($event)" #input>
            <pf-select [label]="'Currency'" [optionsFn$]="currencies$"></pf-select>
            <pf-select [label]="'Order'" [options]="orderOptions"></pf-select>
          </div>
          <div class="pf-ai-jc-center-flex --search"></div>
        </div>    

        <pf-table
          [VM]="VM"
          [columns]="columns"
          [displayedColumns]="displayedColumns"
          [filterable]="true"
          [sticky]="true"
          [pagination]="true"
          [pagesize]="10"
        ></pf-table>
      </section>

      <section class="card --dock">
        <div class="_header pf-motion" (click)="provideLayout('default')">
          <h2 class="_title">{{titleCharts}}</h2>
        </div>    
        <div class="_charts  pf-motion-fast"></div>
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
  displayedColumns: string[];
  layout: IPfDashboardLayoutType;
  modes: IPF_DASHBOARD_MODE;
  orderOptions: IPfSelectOptions[];

  search$: (e: any) => Observable<PfCoin[]>
  currencies$: () => Observable<string[]>

  constructor(public VM:PfDashboardViewModelService, @Inject(SelectMapperService) private _selectMapperSvc:SelectMapperService){
    this.modes = pflm;
    this.provideLayout('min');
    this.orderOptions = cop;
    this.columns = dbc;
    this.displayedColumns = this.columns.map(({columnDef}) => columnDef);

    this.search$ = (e) => {
      return this.VM.search(e);
    }

    this.currencies$ = () => {
      // return this._selectMapperSvc.currencies()
      return of(currency)
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