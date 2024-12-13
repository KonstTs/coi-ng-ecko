import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { PfCacheService } from '../config/cache';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { deviceIsMobile } from '../shared/utils';
import { tap } from 'rxjs/operators';
@UntilDestroy()
@Injectable({providedIn:'root'})
export class PfDeviceService implements OnDestroy{
     readonly deviceIsMobile$ = new Subject<boolean>();

     isMobile$(): Observable<any> { 
          return of(null).pipe(
               switchMap(_ => of(deviceIsMobile())),
               tap(res => this.deviceIsMobile$.next(res)),
               untilDestroyed(this)
          )
     }
     ngOnDestroy(): void {
          this.deviceIsMobile$.complete()
     }
}
