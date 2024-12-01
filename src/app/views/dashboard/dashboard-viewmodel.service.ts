import { Inject, Injectable, InjectionToken, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { dummy } from '../../config/table';
import { IPfTableBaseColdef } from '../../shared/structure/table/table.component';



@Injectable()
export class PfDashboardViewModelService extends PfTableViewModelService<PfCoin> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this);
    protected override searchCb = this.search.bind(this);
    protected override getItemCb = this.getItem.bind(this);
    query = {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        sparkline: false
      }

    constructor(
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService
    ){
        super();
    }

    processReponse = (res:PfCoin[]) => {
        return res;
    }

    getRows(_query: any){
        // return this.apiSvc.apiCoinsMarketGet(_query).pipe(switchMap((res:any) => of(this.processReponse(res))))
      return of(dummy)
    }

    search(_term: string) {
        // return this.apiSvc.apiCoinsSearchGet({ query: _term });
        console.log('search:', _term)
        return of(dummy);
    }

    getItem(_id: string){
        return this.apiSvc.apiCoinsSingleGet({id: _id})
    }

    override ngOnInit(): void {
        super.ngOnInit()
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}





