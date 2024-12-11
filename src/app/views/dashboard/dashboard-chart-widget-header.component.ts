

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PfButtonComponent, PfButtonConfig } from '../../shared/structure/button/button.component'
import { PfSectionHeader } from '../../shared/structure/header/header-base';
import { EChartsCoreOption } from 'echarts';
import { PfStackChartComponent } from '../../shared/structure/charts/pf-stack-chart.component';
import { getElement } from '../../shared/utils';


@Component({
    selector: 'pf-chart-widget-header',
    standalone: true,
    imports:[CommonModule, PfButtonComponent, PfStackChartComponent],
    template: `
        <div class="_header --pf-chart-stacked-widget pf-motion" [class]="headerClass">			
            <h2 class="pf-mrgr10 pf-ai-jc-center-flex pf-animation-slide-in-right --text-white">
                <span class="pf-icon material-symbols-outlined">{{titleIcon}}</span>
                <span>{{ title }}</span>
                <span class="_descr --text-white" >by Market Cap</span>
            </h2>
            <div class="pf-header-stacked-chart" style="width:50%">
                <pf-stack-chart #chart [merge]="stackData"></pf-stack-chart>
            </div>
            @if(!!actions?.length && !hideActions){
                <div class="pf-header-actions">
                    <pf-button *ngFor="let action of actions" [icon]="action.icon" class="pf-header-action" [ngStyle]="{'color': action.active ? action.activeColor : action.color }" [config]="action" (click)="action.command(action)"></pf-button>
            </div>
            }
            
		</div>
    `,
    styleUrls: ['../../views/dashboard/dashboard.component.scss'],
    styles:[`
        :host ::ng-deep button:enabled:active{background: none !important}
        .pf-header-stacked-chart{
            width: 50%; background: rgba(255,255,255,.4); border-radius: 22px; overflow: hidden; height: 20px;
            border-left:3px solid rgba(255,255,255,.1);border-right:3px solid rgba(255,255,255,.1)
        }
        
    `]
})


export class PfChartWidgetHeaderComponent extends PfSectionHeader implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('chart') chart: PfStackChartComponent;
    @Input() title: string;
    @Input() titleIcon?: string;
    @Input() subtitle?: string;
    @Input() actions?: PfButtonConfig[];
    @Input() headerClass: string;
    @Input() stackData: EChartsCoreOption;
    @Input() initOptions: EChartsCoreOption;
    resizer: ResizeObserver;


    constructor() {
        super();
    }

    ngAfterViewInit(): void {

        this.resizer = new ResizeObserver((oens) => {
            for (let oen of oens) {
              const { contentRect: { width, height } } = oen;
              setTimeout((_) => this.chart.instance.resize({ width: Math.floor(width),height: Math.floor(height)}), 300);
            }
          });
          this.resizer.observe(getElement('.pf-header-stacked-chart'));
          
    }
    ngOnInit(): void {}
    ngOnDestroy(): void {}
}



