import { Inject, Injectable, InjectionToken, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { PF_TABLE_COLDEFS_TOKEN, PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { dummy } from '../../config/table';
import { IPfTableBaseColdef } from '../../shared/structure/table/table.component';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PF_TABLE_FILTER_MODEL_TOKEN } from '../../config/filter-defs';

export type CgQueryOrderType = 'market_cap_asc'|'market_cap_desc'|'volume_asc'|'volume_desc'|'id_asc'|'id_desc';
export interface PfDashBoardFilterModel {vs_currency?: string, order?: CgQueryOrderType};

@UntilDestroy()
@Injectable()   
export class PfDashboardViewModelService extends PfTableViewModelService<any> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this);
    protected override searchCb = this.search.bind(this);
    protected override getItemCb = this.getItem.bind(this);

    constructor(
        @Inject(PF_TABLE_COLDEFS_TOKEN) public columns:IPfTableBaseColdef[],
        @Inject(PF_TABLE_FILTER_MODEL_TOKEN) public filters:PfDashBoardFilterModel,
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService
    ){
        super(columns, filters);
    }

    private processReponse = (res:PfCoin[]) => {
        return res;
    }

    getRows(_query: any){
        // return this.apiSvc.apiCoinsMarketGet(_query).pipe(switchMap((res:any) => of(this.processReponse(res))))
      return of(dummy)
    }

    search(_term: string) {
        // return this.apiSvc.apiCoinsSearchGet({ query: _term });
        console.log('this.filterModel 1:', this.filterModel)
        console.log('search:', _term)
        console.log('this.filterModel 2:', this.filterModel)
        return of(dummy);
    }

    getItem(_id: string){
        // return this.apiSvc.apiCoinsSingleGet({id: _id})
        return of()
    }

    ngOnInit(): void {
        super.ngOnInit()
        console.log('this.filterModel 0:', this.filterModel)
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}





