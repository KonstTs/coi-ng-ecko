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
    model: TModel[];
    tableDataSource = new MatTableDataSource<TModel>([])
    source$ = new Subject<TModel[]>();
    
    columns: IPfTableBaseColdef[];
    displayedColumns: string[];
    baseFilterModel: IPfPaginationModel = {page: 1, per_page: 50}
    filterModel: PfFilterModel<any>;
    totalEntries: number;
    
    protected abstract getRowsCb(_query: any): Observable<TModel[]>;
    protected abstract searchCb(_term:string): Observable<TModel[]>;
    protected abstract getItemCb(_id:string): Observable<TModel>;
    notificationSvc: PfNotificationService;
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
 



