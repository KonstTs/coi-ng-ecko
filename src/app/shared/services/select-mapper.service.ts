import { Injectable, Injector } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PfBaseSearchModel } from '../../config/base-search-model';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { IPfSelectOptions } from '../input/select/select.component';
import { COIN_ORDER_QUERY_PARAMS } from '../../views/dashboard/dashboard-config';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectMapperService {
  private readonly _defaultSearchModelPaginationArgs: PfBaseSearchModel = { page: 1, pageSize: 100 };

  constructor(private _injector: Injector){}

  readonly currencies = () => {
    return (this.resolveAutoGetAllFn(PfCoingeckoService, 'apiCoinsCurrenciesGet') as any).pipe(
      switchMap(currencies => of((<string[]>currencies).map((c, i) => ({id:i, label:c, value:c}))))
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


private resolveEnumByValueFn(enumObject: any, key: any | any[]): Observable<any[]> {
    // Check for multiple values
    if (Array.isArray(key)) {
      if (key.length === 0) return of(null);

      let enums = [];
      for (const rec in enumObject) if (key.includes(enumObject[rec].value)) enums.push(enumObject[rec]);
      return of(enums);
    }

    for (const rec in enumObject) {
      if (enumObject[rec].value === key || enumObject[rec].key === key) {
        return of(enumObject[rec]);
      }
    }
    return of(null);
  }




}
