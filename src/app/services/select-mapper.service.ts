import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PfBaseSearchModel } from '../config/base-search-model';
import { PfCoingeckoService } from '../api/services/coins-services.service';
import { tap } from 'rxjs/operators';
import { PfBrowserCacheService } from './browser-cache.service';
import { SESSIONSTORAGE_CACHE_TOKEN } from '../config/cache';

@Injectable({
  providedIn: 'root'
})
export class SelectMapperService {
  private readonly _defaultSearchModelPaginationArgs: PfBaseSearchModel = { page: 1, pageSize: 250 };

  constructor(private _injector: Injector, @Inject(SESSIONSTORAGE_CACHE_TOKEN) private _cacheSvc:PfBrowserCacheService){}

  readonly currencies = () => {
    return this._cacheSvc.get('pfcurrencies').pipe(
      switchMap(cached => cached ? of(cached) : (this.resolveAutoGetAllFn(PfCoingeckoService, 'apiCoinsCurrenciesGet') as any)),
      tap(cur => this._cacheSvc.set('pfcurrencies', cur)),
      switchMap(currencies => of((<string[]>currencies).map((c, i) => ({id:i, label:c, value:c})))),
    )


  };
  
  
  resolveAutoGetAllFn(searchableEntityService: any, searchMethodName: string): Observable<any[]> {
    const entityService = this._injector.get<any>(searchableEntityService);
    const entityServiceName = entityService.constructor.name;

    if(typeof entityService[searchMethodName] !== 'function'){
        throw new Error(`Service ${entityServiceName} does not contain a valid 'search' method`);
    } 
    return entityService[searchMethodName]();
  }


}
