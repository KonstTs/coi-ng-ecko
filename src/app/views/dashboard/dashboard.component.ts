import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PfDashboardViewModelService } from './dashboard-viewmodel.service';
// import { DASHBOARD_CONFIG as dbc, constructBarChartDataset, PF_DASHBOARD_COLUMNS as dbc, IPF_DASHBOARD_MODE, IPfDashboardLayoutType, PF_DASHBOARD_LAYOUT_MODES as pflm } from './dashboard-config';
import { DASHBOARD_CONFIG as dbc, IPF_DASHBOARD_MODE, IPfDashboardLayoutType } from './dashboard-config';

import { IPfTableBaseColdef, PfTableComponent } from '../../shared/structure/table/table.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PF_TABLE_COLDEFS_TOKEN } from '../../shared/structure/table/table-viewmodel.service';
import { IPfSelectOptions, PfSelectComponent } from '../../shared/input/select/select.component';
import { SelectMapperService } from '../../services/select-mapper.service';
import { PF_DASHBOARD_FILTERS, PF_TABLE_FILTER_MODEL_TOKEN } from '../../config/filter-defs';
import { FormsModule } from '@angular/forms';
import { SESSIONSTORAGE_CACHE } from '../../config/cache';
import { PfHorizontalScrollerDirective } from '../../shared/directives/horizontal-scroll.directive';
import { PfChartComponent } from '../../shared/structure/charts/pf-chart.component';
import { PF_CELL_FORMATTER_TOKEN, PfCellRenderer } from '../../shared/structure/table/table-cell-renderers';
import { EChartsCoreOption } from 'echarts';
import { PfTextComponent } from '../../shared/input/text/text.component';
import { PfButtonConfig } from '../../shared/structure/button/button.component';
import { PfChartWidgetHeaderComponent } from './dashboard-chart-widget-header.component';
import { PfNotificationService } from '../../services/notification.service';
import { PfBrowserCacheService } from '../../services/browser-cache.service';

@Component({
	standalone: true,
	imports: [PfTableComponent, CommonModule, PfSelectComponent, FormsModule, PfChartComponent, PfTextComponent, PfChartWidgetHeaderComponent],
	providers: [
		PfNotificationService,
		PfDashboardViewModelService,
		SelectMapperService,
		SESSIONSTORAGE_CACHE,
		{ provide: PF_CELL_FORMATTER_TOKEN, useFactory: PfCellRenderer },
		{ provide: PF_TABLE_FILTER_MODEL_TOKEN, useValue: PF_DASHBOARD_FILTERS },
		{ provide: PF_TABLE_COLDEFS_TOKEN, useValue: dbc.columns }
	],
	styleUrls: ['./dashboard.component.scss'],
	template: `
		<div class="dashboard --docked" [ngClass]="layout['hostClass']">
			<section class="widget --coins">
				<div class="_header --bg-blue" (click)="(layout['hostClass']==='--max') && provideLayout('default')">
					<div class="pf-ai-jc-center-flex --title">
						<h2 class="pf-mrgr10 pf-ai-jc-center-flex pf-animation-slide-in-right --text-white">
							<span class="pf-icon material-symbols-outlined">paid</span>
							<span class="--text-white">{{ titleCoins }}</span>
						</h2>

						<pf-text
							class="--not-max"
							[iconClass]="'filter_alt'" 
							[iconColor]="'#d5d5d5'" 
							[cssClass]="'pf-table-filter-input'" 
							[clearable]="true" 
							(keyup)="PfTable.onFilter($event)"
						></pf-text>

					</div>
					<div class="pf-ai-jc-center-flex --filters --not-max">

						<pf-select 
							style="width: 240px" 
							[label]="'Columns'" 
							[options]="columnsMap" 
							[multiple]="true" 
							[(ngModel)]="VM.displayedColumns"
						></pf-select>

						<pf-select
							style="width: 100px;"s
							[label]="'Currency'"
							[optionsFn$]="currencies$"
							[(ngModel)]="VM.filterModel.vs_currency"
							(ngModelChange)="search$($event)"
						></pf-select>

						<pf-select 
							style="width: 130px;" 
							[label]="'Order'" 
							[options]="orderOptions" 
							[(ngModel)]="VM.filterModel.order" 
							(ngModelChange)="search$($event)"
						></pf-select>
					</div>
				</div>

				<pf-table 
					[VM]="VM"
					[filterable]="true" 
					[sticky]="true" 
					[pagination]="true"
					[pagesize]="50"
					[pagerClass]="'--not-max'"
				></pf-table>

			</section>

			<section class="widget --dock">
				
				<pf-chart-widget-header
					[title]="titleCharts"
					[titleIcon]="'bar_chart_4_bars'"
					[actions]="chartActions"
					[headerClass]="'--bg-blue'"
					[stackData]="stackData"
				></pf-chart-widget-header>

				<div class="_charts pf-motion pf-animation-fade-in">
					<pf-chart [merge]="chartData" [sizer]="'._charts'"></pf-chart>
				</div>
			</section>
		</div>
	`
})
export class PfDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(PfTableComponent) PfTable: PfTableComponent;
	@ViewChild(PfChartComponent) PFChart: PfChartComponent;

	titleCoins = 'Coins';
	titleCharts = 'Charts';

	searchLabel = '';
	columns: IPfTableBaseColdef[];
	columnsMap: any;
	displayedColumns: string[];
	orderOptions: IPfSelectOptions[];
	
	modes: IPF_DASHBOARD_MODE;
	layout: IPfDashboardLayoutType;
	
	chartActions: PfButtonConfig[];
	chartData: EChartsCoreOption;
	stackData:  EChartsCoreOption;

	search$: (e: any) => Observable<PfCoin[]>;
	currencies$: () => Observable<string[]>;

	constructor(
		public VM: PfDashboardViewModelService,
		@Inject(SelectMapperService) private _selectMapperSvc: SelectMapperService
	) {
		const { layouts, ordering, provideLayoutActionsFor, provideChartData } = dbc;

		this.modes = layouts;
		this.orderOptions = ordering;
		this.columnsMap = this.VM.columns.map((c, i) => ({ label: c.header, value: c.columnDef }));
		this.provideLayout('default');

		this.VM.barchart$.subscribe(([d, v]) => { 
			this.chartActions = provideLayoutActionsFor(layouts, this.provideLayout.bind(this));
			const { bar, stack } = provideChartData([d, v], this.VM);
			this.chartData = bar;
			this.stackData = stack;
		});

		this.search$ = (e) => {
			return this.VM.search(e);
		};

		this.currencies$ = () => {
			return this._selectMapperSvc.currencies() as any;
		};
	}

	provideLayout(type: string) {
		if (this.layout?.id === type) return;
		this.chartActions?.forEach(a => (a.active = a.id === type))
		this.layout = (<any>this.modes)[type];
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		// this.PfTable.paginator.nextPage()
	}

	ngOnDestroy(): void {}
}

// <section class="pf-height pf-jc-center-flex pf-coloumn-flex">
