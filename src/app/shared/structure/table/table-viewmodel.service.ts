import { HttpErrorResponse } from '@angular/common/http';
import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import { PfBaseEntity } from '../../../config/base-entity';
import { mergeObjects } from '../../utils';
import { IPfTableBaseColdef } from './table.component';
// import { LOCALSTORAGE_CACHE_TOKEN, PfCacheService } from '../../../config/cache';

export type PfQueryFragment = string | number[] | Date;
export type PfQueryPage = { page?: number; per_page?: number;}
export const PF_TABLE_BASE_PAGING: PfQueryPage = {page:0, per_page:100} 

@UntilDestroy()
@Directive()
export abstract class PfTableViewModelService<TModel extends PfBaseEntity> implements OnInit, OnDestroy {
    model: TModel[] = [];
    model$ = new BehaviorSubject<TModel[]>(this.model);
    paging: PfQueryPage;
    query: any;
    columns: string[] = [];

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

    constructor(
        injector: Injector,
        _query:any, 
        _pagingQuery:PfQueryPage = {}
    ) 
    {
        // this.notificationSvc = injector.get<PfNotificationService>(PfNotificationService);
        this.query =  structuredClone(_query);
        this.paging = mergeObjects(structuredClone(PF_TABLE_BASE_PAGING), _pagingQuery);
    }

    // private provideColumnModel = (cols:string[]): IPfTableBaseColdef[] => cols.map(col => [{columnDef: col, header: col.toUpperCase()}])

    getRows$(_query: any){
        return of(null).pipe(
            tap(() => this.emitIsBusy(true)),
            switchMap(() => this.getRowsCb(_query)),
            tap((res) => {
                this.model = res ?? [];
                this.model$.next(this.model)
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
        // console.log('this.query:', this.query)
        // console.log('this.paging:', this.paging)
        // this.getRows$({...this.query, ...this.paging}).subscribe()
    }

    ngOnDestroy(): void {
      this._isBusy$.complete();
      this.model$.complete();
    }
 
   
  }
 



