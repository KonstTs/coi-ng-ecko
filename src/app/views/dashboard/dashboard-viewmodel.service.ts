import { Inject, Injectable, InjectionToken, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { BehaviorSubject, filter, of, switchMap, tap } from 'rxjs';
import { PF_TABLE_COLDEFS_TOKEN, PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { currency, dummy } from '../../config/table';
import { IPfTableBaseColdef } from '../../shared/structure/table/table.component';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PF_TABLE_FILTER_MODEL_TOKEN } from '../../config/filter-defs';
import { DomSanitizer } from '@angular/platform-browser';
import { ICurrencyFormatter, IPfCellRenderer, PF_CELL_FORMATTER_TOKEN, PfCellRenderer } from '../../shared/structure/table/table-cell-renderers';

export type CgQueryOrderType = 'market_cap_asc'|'market_cap_desc'|'volume_asc'|'volume_desc'|'id_asc'|'id_desc';
export interface PfDashBoardFilterModel {vs_currency?: string, order?: CgQueryOrderType};

@UntilDestroy()
@Injectable()   
export class PfDashboardViewModelService extends PfTableViewModelService<any> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this);
    protected override searchCb = this.search.bind(this);
    protected override getItemCb = this.getItem.bind(this);

    barchart$ = new BehaviorSubject<any>([]);

    constructor(
        @Inject(PF_CELL_FORMATTER_TOKEN) public Renderer:IPfCellRenderer,
        @Inject(PF_TABLE_COLDEFS_TOKEN) public columns:IPfTableBaseColdef[],
        @Inject(PF_TABLE_FILTER_MODEL_TOKEN) public filters:PfDashBoardFilterModel,
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService
    ){
        super(columns, filters);
    }

    private provideCellFormatted(_coin, _type:any, _value:any):string {
      const {name, image, symbol} = _coin;
      const {cells, defaultCellColor} = this.Renderer;

      if(!isNaN(_value)) return cells.currency(_value, `color:${{low_24h: '#ff451d', high_24h: '#619b48'}[_type] ?? defaultCellColor}`);
      if(_type==='name') return `${cells.image(image, `<strong>${name}</strong>`)}`;
      if(_type==='symbol') return `<strong>${symbol.toUpperCase()}</strong>`;
      return _value;
    }

    private processReponse = (res:PfCoin[]):any => res
       .map((coin:any) => Object.assign({}, ...(Object.keys(coin)
       .map(k => ([...this.displayedColumns, 'image'].includes(k) && { [k]:this.provideCellFormatted(coin, k, coin[k]) }))
       .filter(coin => !!coin))))

    

    getRows(_query: any){
        // return this.apiSvc.apiCoinsMarketGet(_query).pipe(switchMap((res:any) => of(this.processReponse(res))))
      return of(dummy).pipe(
            tap(res => {
                const [d,v]=[[],[]];
                for(let i=0;i<15;i++) (({name, market_cap} = res[i]) => (d.push(name), v.push(market_cap)))();
                this.barchart$.next([d,v]);
            }),
            switchMap(d => of(this.processReponse(d)))
        )
    }

    search(_term: string) {
        // return this.apiSvc.apiCoinsSearchGet({ query: _term });
        // console.log('this.filterModel 1:', this.filterModel)
        // console.log('search:', _term)
        // console.log('this.filterModel 2:', this.filterModel)
        return of(dummy);
    }

    getItem(_id: string){
        // return this.apiSvc.apiCoinsSingleGet({id: _id})
        return of()
    }

    ngOnInit(): void {
        super.ngOnInit()
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.barchart$.complete()
    }
}





