import {  OnInit, AfterViewInit, OnDestroy, Input, Component, HostBinding } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ECharts, EChartsCoreOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { PF_STACK_CHART_OPTIONS } from '../../../config/chart-base-options';
import { TooltipComponent } from 'echarts/components';
echarts.use([BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export type PfChartDataType = {
  name: string;
  value: [string, number];
};

@Component({
  selector: 'pf-stack-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  styles: [':host{width:100%}'],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div class="pf-chart-wrapper" [style.width]="width" [style.height]="height">
      <echarts #chart (chartInit)="onInit($event)" [initOpts]="initOptions" [options]="options" [merge]="merge" class="pf-chart"></echarts>
    </div>
  `
})
export class PfStackChartComponent implements OnInit, AfterViewInit, OnDestroy {
  static nextId = 0;
  @HostBinding() id = `pf-stack-chart-${PfStackChartComponent.nextId++}`;
  chart: ECharts;
  instance: ECharts;

  @Input() sizer: string;
  @Input() width = '100%';
  @Input() height = '30px';
  @Input() initOptions = { renderer: 'svg', width: 500 , height: 30 };
  @Input() options?: EChartsCoreOption;
  @Input() merge?: EChartsCoreOption;

  onInit(e: any) {
    this.instance = e;
  }

  constructor() {
    this.options = PF_STACK_CHART_OPTIONS;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
}
