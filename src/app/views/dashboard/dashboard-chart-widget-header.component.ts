

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { PfButtonComponent, PfButtonConfig } from '../../shared/structure/button/button.component'
import { PfSectionHeader } from '../../shared/structure/header/header-base';
import { EChartsCoreOption } from 'echarts';
import { PfStackChartComponent } from '../../shared/structure/charts/pf-stack-chart.component';


@Component({
    selector: 'pf-chart-widget-header',
    standalone: true,
    imports:[CommonModule, PfButtonComponent, PfStackChartComponent],
    template: `
        <div class="_header pf-motion" [class]="headerClass">			
            <h2 class="pf-mrgr10 pf-ai-jc-center-flex pf-animation-slide-in-right --text-white">
                <span class="pf-icon material-symbols-outlined">{{titleIcon}}</span>
                <span>{{ title }}</span>
                <span class="_descr --text-white" >by Market Cap</span>
            </h2>
            <!-- <h6 class="--not-max pf-root-color" >By Market Cap</h6> -->
            <div class="pf-header-stacked-chart">
                <pf-stack-chart [merge]="stackData"></pf-stack-chart>
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
    `]
})


export class PfChartWidgetHeaderComponent extends PfSectionHeader implements OnInit, AfterViewInit, OnDestroy{
    @Input() title: string;
    @Input() titleIcon?: string;
    @Input() subtitle?: string;
    @Input() actions?: PfButtonConfig[];
    @Input() headerClass: string;
    @Input() stackData: EChartsCoreOption;
    @Input() initOptions: EChartsCoreOption;


    constructor() {
        super();
    }

    ngAfterViewInit(): void {}
    ngOnInit(): void {}
    ngOnDestroy(): void {}
}



