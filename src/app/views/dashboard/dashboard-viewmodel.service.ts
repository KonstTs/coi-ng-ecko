import { Inject, Injectable, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { DomSanitizer } from '@angular/platform-browser';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { IPfCoinMarket } from '../../models/coins/coins-market';




@Injectable()
export class PfDashboardViewModelService extends PfTableViewModelService<PfCoin> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this)
    protected override searchCb = this.search.bind(this) 

    constructor(
        injector: Injector,
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService,
    ){
        super(injector);
    }


    transformRows = (res:IPfCoinMarket[]) => {
        return res;
    }

    getRows(_rows?: string, _page?: string ){
        return this.apiSvc.apiCoinsMarketGet({ rows: _rows, page: _page }).pipe(switchMap((res:any) => of(this.transformRows(res))))
    }

    search(_query: string) {
        return this.apiSvc.apiCoinsSearchGet({ query: _query }).pipe(switchMap((res:any) => of(this.transformRows(res))))
    }


    getItem(_id: string){
        // return this.apiSvc.apiPudoCompanySingleGet({id:id})
    }


    override ngOnInit(): void {
        super.ngOnInit()
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}





