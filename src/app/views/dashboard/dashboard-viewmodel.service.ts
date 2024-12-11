import { Inject, Injectable, InjectionToken, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { BehaviorSubject, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { PF_TABLE_COLDEFS_TOKEN, PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { currency, dummy } from '../../config/table';
import { IPfTableBaseColdef } from '../../shared/structure/table/table.component';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PF_TABLE_FILTER_MODEL_TOKEN } from '../../config/filter-defs';
import { DomSanitizer } from '@angular/platform-browser';
import { ICurrencyFormatter, IPfCellRenderer, PF_CELL_FORMATTER_TOKEN, PfCellRenderer } from '../../shared/structure/table/table-cell-renderers';
import { PfBaseEntity } from '../../config/base-entity';
import { SESSIONSTORAGE_CACHE, SESSIONSTORAGE_CACHE_TOKEN } from '../../config/cache';
import { PfBrowserCacheService } from '../../services/browser-cache.service';

export type CgQueryOrderType = 'market_cap_asc'|'market_cap_desc'|'volume_asc'|'volume_desc'|'id_asc'|'id_desc';
export interface PfDashBoardFilterModel {vs_currency?: string, order?: CgQueryOrderType};

@UntilDestroy()
@Injectable()   
export class PfDashboardViewModelService extends PfTableViewModelService<any> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this);
    protected override searchCb = this.search.bind(this);
    protected override getItemCb = this.getItem.bind(this);

    barchart$ = new BehaviorSubject<any>([]);
    topCoinsCount = 15;    

    constructor(
        injector: Injector,
        @Inject(PF_CELL_FORMATTER_TOKEN) public Renderer:IPfCellRenderer,
        @Inject(PF_TABLE_COLDEFS_TOKEN) public columns:IPfTableBaseColdef[],
        @Inject(PF_TABLE_FILTER_MODEL_TOKEN) public filters: PfDashBoardFilterModel,
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService,
        @Inject(SESSIONSTORAGE_CACHE_TOKEN) protected cacheSvc:PfBrowserCacheService
    ){
        super(columns, filters, injector);

    }

    private provideCellFormatted(_coin, _type:any, _value:any, _i:number):string {
      const {name, image, symbol} = _coin;
        const { cells, defaultCellColor } = this.Renderer;
        const aa = (this.filterModel.page-1)*this.filterModel.per_page+_i

      if(!isNaN(_value)) return cells.currency(_value, `color:${{low_24h: '#ff451d', high_24h: '#619b48'}[_type] ?? defaultCellColor}`);
      if(_type==='name') return cells.image(image, `<span style="color:#999">${aa}</span>`, `<strong>${name}</strong>`);
      if(_type==='symbol') return `<strong>${symbol.toUpperCase()}</strong>`;
      return _value;
    }

    private processReponse = (res:PfCoin[]):any => res
       .map((coin:any, i) => Object.assign({}, ...(Object.keys(coin)
       .map((k) => ([...this.displayedColumns, 'image'].includes(k) && { [k]:this.provideCellFormatted(coin, k, coin[k], i)}))
       .filter(coin => !!coin))))

       getTotals(): Observable<any> { 
        return this.apiSvc.apiCoinsListGet().pipe(tap(res => this.totalEntries = res.length), untilDestroyed(this))
    }
    

    getRows(_query: any) {
        console.log('this.filterModel:', this.filterModel)
        return this.apiSvc.apiCoinsMarketGet(_query)
            .pipe(
                tap(res => {
                    const [d,v]=[[],[]];
                    for (let i = 0; i < this.topCoinsCount; i++) (({ name, market_cap } = res[i]) => (d.push(name), v.push(market_cap)))();
                    this.barchart$.next([d,v]);
                }),
                switchMap(d => of(this.processReponse(d)))
            )
        // return of(dummy).pipe(
        //             tap(res => {
        //                 const [d,v]=[[],[]];
        //                 for (let i = 0; i < this.topCoinsCount; i++) (({ name, market_cap } = res[i]) => (d.push(name), v.push(market_cap)))();
        //                 this.barchart$.next([d,v]);
        //         }),
        //             switchMap(d => of(this.processReponse(d)))
        //         );
    }

    search(_term: string) {
        // return this.apiSvc.apiCoinsSearchGet({ query: _term });
        return of(null);
    }

    getItem(_id: string){
        // return this.apiSvc.apiCoinsSingleGet({id: _id})
        return of(null)
    }

    ngOnInit(): void {
        super.ngOnInit()
        this.getTotals().subscribe(_=> console.log('this.totalEntries:', this.totalEntries))
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.barchart$.complete()
    }
}





