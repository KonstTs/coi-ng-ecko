import { HttpErrorResponse } from '@angular/common/http';
import { Directive, InjectionToken, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { PfBaseEntity } from '../../../config/base-entity';
import { mergeObjects } from '../../utils';
import { IPfTableBaseColdef } from './table.component';
import { MatTableDataSource } from '@angular/material/table';
import { IPfPaginationModel, PfFilterModel } from '../../../config/filter-defs';
import { PfNotificationService } from '../../../services/notification.service';

export const PF_TABLE_COLDEFS_TOKEN = new InjectionToken<IPfTableBaseColdef[]>('PF_TABLE_COLDEFS');


@UntilDestroy()
@Directive()
export abstract class PfTableViewModelService<TModel extends PfBaseEntity> implements OnInit, OnDestroy {
    //raw responce
    model: TModel[];
   
    //table consumable datasets
    tableDataSource = new MatTableDataSource<TModel>([]);
  
    //datastream
    source$ = new Subject<TModel[]>();
    
    //table bootstraping resources
    columns: IPfTableBaseColdef[];
    displayedColumns: string[];
    baseFilterModel: IPfPaginationModel = {page: 1, per_page: 50}
    filterModel: PfFilterModel<any>;
    totalEntries: number;
  
    //instance restricted callbacks ensuring generic's class independence and immutability
    protected abstract getRowsCb(_query: any): Observable<TModel[]>;
    protected abstract searchCb(_term:string): Observable<TModel[]>;
    protected abstract getItemCb(_id: string): Observable<TModel>;

    //global notification 
    notificationSvc: PfNotificationService;
  
    //publishing class availability
    protected _isBusy$ = new Subject<boolean>();
    emitIsBusy(isBusy: boolean): void {
        this._isBusy$.next(isBusy);
    }
    get isBusy$(): Observable<boolean> {
      return this._isBusy$.asObservable();
    }

  
  constructor(
    _columns: IPfTableBaseColdef[],
    _filters: PfFilterModel<any>,
    protected injector: Injector,
  ) 
    {
      this.columns = _columns;
      this.displayedColumns = this.columns.map(({columnDef}) => columnDef);
      this.filterModel = mergeObjects(this.baseFilterModel, _filters ?? {});
      this.notificationSvc = injector.get<PfNotificationService>(PfNotificationService);
  }

    //provides raw table datasets 
    getRows$(_query?: any){
        return of(null).pipe(
            tap(() => this.emitIsBusy(true)),
          switchMap(() => this.getRowsCb(_query)),
          tap((res) => {
              if (!res) res = [];
              this.model = res;
              this.tableDataSource = new MatTableDataSource(this.model);
              this.source$.next(this.model);
          }),
            untilDestroyed(this),
            finalize(() => {
                this.emitIsBusy(false);
            })
        )
  }


    // to be implemented
    searchItems$(_term: string){
      return of(null).pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.searchCb(_term)),
          catchError(error => {
            this.handleError$(error);
            return of(null)
          }),
          untilDestroyed(this),
          finalize(() => {
            this.emitIsBusy(false);
          })
        )
    }

  // to be implemented
    getItem$(_id: string){
        return of(null).pipe(
            tap(() => this.emitIsBusy(true)),
            switchMap(() => this.getItemCb(_id)),
            catchError(error => {
              this.handleError$(error);
              throw error;
            }),
            untilDestroyed(this),
            finalize(() => {
              this.emitIsBusy(false);
            })
          )
    }


    // basic error handling utilizing global notification svc
    handleError$(error: HttpErrorResponse): void {
      // handle message and provide strings;
      this.notificationSvc.alert({title:'Bummer', severity: 'error'})
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
      this._isBusy$.complete();
      this.source$.complete();
      this.notificationSvc.alerted$.complete();
    }
 
   
  }
 



