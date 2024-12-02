import { HttpErrorResponse } from '@angular/common/http';
import { Directive, InjectionToken, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import { PfBaseEntity } from '../../../config/base-entity';
import { mergeObjects } from '../../utils';
import { IPfTableBaseColdef } from './table.component';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
// import { LOCALSTORAGE_CACHE_TOKEN, PfCacheService } from '../../../config/cache';

// export const PF_TABLE_QUERY_TOKEN = new InjectionToken<any>('PF_TABLE_QUERY');
export const PF_TABLE_COLDEFS_TOKEN = new InjectionToken<IPfTableBaseColdef[]>('PF_TABLE_COLDEFS');
export interface IPfTablePaginationOptions { page?: number; per_page?: number;}
export const PF_TABLE_BASE_PAGING_OPTIONS: IPfTablePaginationOptions = {page:0, per_page:100};


@UntilDestroy()
@Directive()
export abstract class PfTableViewModelService<TModel extends PfBaseEntity> implements OnInit, OnDestroy {
    model: TModel[];
    tableDataSource: MatTableDataSource<TModel>
    source$ = new Subject<MatTableDataSource<TModel>>();
    
    columns: IPfTableBaseColdef[];
    displayedColumns: string[];
    paging: IPfTablePaginationOptions;
    
    protected abstract getRowsCb(_query: any): Observable<TModel[]>;
    protected abstract searchCb(_term:string): Observable<TModel[]>;
    protected abstract getItemCb(_id:string): Observable<TModel>;
    // protected notificationSvc: PfNotificationService;
    protected _isBusy$ = new Subject<boolean>();

    protected emitIsBusy(isBusy: boolean): void {
        this._isBusy$.next(isBusy);
    }

    get isBusy$(): Observable<boolean> {
      return this._isBusy$.asObservable();
    }

    constructor(_columns: IPfTableBaseColdef[]) 
    {
      this.columns = _columns;
      this.displayedColumns = this.columns.map(({columnDef}) => columnDef);
      // this.notificationSvc = injector.get<PfNotificationService>(PfNotificationService);
        
    }


    getRows$(_query?: any){
        return of(null).pipe(
            tap(() => this.emitIsBusy(true)),
            switchMap(() => this.getRowsCb(_query)),
            tap((res) => {
              console.log('getRows:', res) 
                this.model = res;
                this.tableDataSource = new MatTableDataSource(this.model);
                this.source$.next(this.tableDataSource)
            }),
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

    searchItems$(_term: string){
      return of(null).pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.searchCb(_term)),
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
        console.log('error:', error)
      // let message: string;
 
      // if (isApiResponse(err.error)) {
      //   message = err.error.messages.map((msg) => msg.message).join('\n');
      // } else {
      //   message = err.error.Message || err.error.title;
      // }
 
    //   this.notificationSvc.showError(I18N.common.unhandledError, 'ERROR');
    }

    ngOnInit(): void {
        this.getRows$({}).subscribe()
    }

    ngOnDestroy(): void {
      this._isBusy$.complete();
      this.source$.complete();
    }
 
   
  }
 



