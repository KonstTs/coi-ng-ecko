import { Directive, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, InjectionToken, EventEmitter, Output, Component, HostBinding, Host } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartView, ECharts, EChartsCoreOption, SeriesOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { PF_CHART_OPTIONS } from '../../../config/chart-base-options';
import { TooltipComponent } from 'echarts/components';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { CssSelector } from '@angular/compiler';
import { getElement } from '../../utils';
echarts.use([BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export type PfChartDataType = {
  name: string;
  value: [string, number];
};

@Component({
  selector: 'pf-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  styles: [':host{display:flex;align-items:center;justify-content:center;width:100%}'],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div class="pf-chart-wrapper" [style.width]="width" [style.height]="height">
      <echarts #chart (chartInit)="onInit($event)" [initOpts]="initOptions" [options]="options" [merge]="merge" class="pf-chart"></echarts>
    </div>
  `
})
export class PfChartComponent implements OnInit, AfterViewInit, OnDestroy {
  static nextId = 0;
  //dom concerning handlers
  @HostBinding() id = `pf-chart-${PfChartComponent.nextId++}`;

  @ViewChild('chart')
  chart: ECharts;
  instance: ECharts;
  resizer: ResizeObserver;

  //configurable resizeObserver's source hook 
  @Input() sizer: string;

  @Input() width = '90%';
  @Input() height = '300px';
  @Input() initOptions = { renderer: 'svg', width: 1000 , height: 300 };
  @Input() options?: EChartsCoreOption;
  @Input() merge?: EChartsCoreOption;

  onInit(e: any) {
    this.instance = e;
  }

  constructor() {
    this.options = PF_CHART_OPTIONS;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // attach obeservation on provided element -sizer- and adjust chart's geometric behaviour accordingly
    this.resizer = new ResizeObserver((oens) => {
      for (let oen of oens) {
        const {contentRect: { width, height }} = oen;
        setTimeout((_) => this.instance.resize({ width: Math.floor(width), height: Math.floor(height) }), 300);
      }
    });
    this.resizer.observe(getElement(this.sizer ?? `#${this.id}`));
    setTimeout((_) => (this.width = '100%'), 100);
  }
  ngOnDestroy(): void {
    this.resizer.disconnect();
  }
}
