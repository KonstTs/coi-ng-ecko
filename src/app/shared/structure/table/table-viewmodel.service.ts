import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { iif, Observable, of, Subject } from 'rxjs';
import { catchError, filter, finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import { PfBaseEntity } from '../../../models/base-entity';
// import { PfModelChangeArgs } from '../../../model/model-change-args';
// import { PfModelChangingArgs } from '../../../model/model-changing-args';
// import { PfModelProxyService } from '../../../core/services/model-proxy/model-proxy.service';
// import { PfNotificationService } from '../../../core/services/notification.service';
// import { StrictHttpResponse } from '@app/api/strict-http-response';




@UntilDestroy()
@Directive()
export abstract class PfTableViewModelService<TModel extends PfBaseEntity> implements OnInit, OnDestroy {
    model!: TModel[];
    response: any;


    get isBusy$(): Observable<boolean> {
      return this._isBusy$.asObservable();
    }
 
    // get isDirty$(): Observable<boolean> {
    //   return this.modelProxySvc.isDirty$;
    // }
 
    protected abstract getRowsCb(): Observable<TModel[]>;
    // protected abstract getItemCb: (id: string) => Observable<TModel>;
    protected abstract searchCb(query:string): Observable<TModel[]>;
    // protected abstract filterCb(query:string): Observable<TModel[]>;

 
    // notificationSvc: PfNotificationService;
    // modelProxySvc: PfModelProxyService<TModel[]>;

    protected _isBusy$ = new Subject<boolean>();
    // protected _isDirty$ = new Subject<boolean>();
 
    constructor(injector: Injector) {
    //   this.modelProxySvc = injector.get<PfModelProxyService<any>>(PfModelProxyService);
    //   this.notificationSvc = injector.get<PfNotificationService>(PfNotificationService);
     }
 
    // abstract deleteResponse(id: string): Observable<StrictHttpResponse<void>>;
    ngOnInit(): void {
      this.init().subscribe(_=> console.log('model', this.model));
    }


    ngOnDestroy(): void {
      this._isBusy$.complete();
    //   this._isDirty$.complete();
    }


    // setupModelProxy() {
    // //   this.modelProxySvc.modelChanged = this.modelChanged.bind(this);
    // //   this.modelProxySvc.modelChanging = this.modelChanging.bind(this);
    // }


    // modelChanged(change: PfModelChangeArgs<TModel>): void {}
    // modelChanging(change: PfModelChangingArgs<TModel>): boolean | Observable<boolean> {
    //   return true;
    // }


    init(){
      return of(null)
        .pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.getRowsCb()),
          tap((res) => this.model = res),
          finalize(() => {
            // this.emitIsDirty(false);
            this.emitIsBusy(false);
          }),
          take(1),
          untilDestroyed(this)
        )
    }


    searchItems(query:string){
      return of(null)
        .pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.searchCb(query)),
          tap((res) => this.model = res),
          finalize(() => {
            // this.emitIsDirty(false);
            this.emitIsBusy(false);
          }),
          take(1),
          untilDestroyed(this)
        )
    }


    // filterItems(query:string){
    //   return of(null)
    //     .pipe(
    //       tap(() => this.emitIsBusy(true)),
    //       switchMap(() => this.filterCb(query)),
    //       tap((res) => this.model = res),
    //       finalize(() => {
    //         // this.emitIsDirty(false);
    //         this.emitIsBusy(false);
    //       }),
    //       take(1),
    //       untilDestroyed(this)
    //     )
    // }



    // getItem(id:string){}
 
 
    protected emitIsBusy(isBusy: boolean): void {
      this._isBusy$.next(isBusy);
    }
 
    // protected emitIsDirty(isDirty: boolean): void {
    //   this._isDirty$.next(isDirty);
    // }
 
 
    showError(err: HttpErrorResponse): void {
      // let message: string;
 
      // if (isApiResponse(err.error)) {
      //   message = err.error.messages.map((msg) => msg.message).join('\n');
      // } else {
      //   message = err.error.Message || err.error.title;
      // }
 
    //   this.notificationSvc.showError(I18N.common.unhandledError, 'ERROR');
    }
 
   
  }
 



