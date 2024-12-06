import { Directive, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, InjectionToken, EventEmitter, Output, Component, HostBinding } from "@angular/core";
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartView, ECharts, EChartsCoreOption, SeriesOption } from "echarts";
import { CommonModule } from "@angular/common";
import { PF_CHART_OPTIONS } from "../../../config/chart-base-options";
echarts.use([BarChart, LineChart, PieChart, GridComponent, CanvasRenderer]);


export type PfChartDataType = {
  name: string;
  value: [string, number];
};

@Component({
  selector: 'pf-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  template: `
  <div #chart echarts [options]="initOptions" [merge]="mergeOptions" class="pf-chart"></div>
  `,
  styleUrls: ['./pf-chart.component.scss'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export abstract class PfChartComponent implements OnInit, AfterViewInit, OnDestroy{
    static nextId = 0;
    @HostBinding() id = `pf-chart-${PfChartComponent.nextId++}`;

    @ViewChild('chart') chart: ECharts;
    @Input() initOptions?: EChartsCoreOption ; 
    @Input() options?: EChartsCoreOption ;
    @Input() mergeOptions?: EChartsCoreOption ;
    // {
    //   legend: {},
    //   tooltip: {},
    //   dataset: {
    //     // Provide a set of data.
    //     source: [
    //       ['product', '2015', '2016', '2017'],
    //       ['Matcha Latte', 43.3, 85.8, 93.7],
    //       ['Milk Tea', 83.1, 73.4, 55.1],
    //       ['Cheese Cocoa', 86.4, 65.2, 82.5],
    //       ['Walnut Brownie', 72.4, 53.9, 39.1],
    //     ],
    //   },
    //   // Declare an x-axis (category axis).
    //   // The category map the first column in the dataset by default.
    //   xAxis: { type: 'category' },
    //   // Declare a y-axis (value axis).
    //   yAxis: {},
    //   // Declare several 'bar' series,
    //   // every series will auto-map to each column by default.
    //   series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    // };
    // @Input() plugins?: Plugin | Plugin[] | any;
    // @Input() width = '100%';
    // @Input() height = '100%';
    // @Input() responsive = true;
    // @Input() dataClickFn: (...args:any) => void | any;


    // @Output() chartRefreshed = new EventEmitter();
   
    // chartOptions: ChartOptions;
    // chartPlugins: Plugin | Plugin[] | any;
    // baseOptions: ChartOptions;
   
    constructor() {
        this.initOptions = structuredClone(PF_CHART_OPTIONS);
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {}
    ngOnDestroy(): void {}
}



