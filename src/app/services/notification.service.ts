import { Injectable, Injector, OnDestroy } from '@angular/core';
import { PfAlertComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PF_DEFAULT_DIALOG_CONFIG, PfDialogConfig, PfDialogMsg, PfSeverity } from '../config/base-notification';
import { mergeObjects } from '../shared/utils';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';


@Injectable()
export class PfNotificationService implements OnDestroy{
     data: any;
     private _defaultOptions = structuredClone(PF_DEFAULT_DIALOG_CONFIG);
     alerted$ = new Subject<any>()

     constructor(private dialog: MatDialog, protected Injector: Injector) { }

     alert(message:PfDialogMsg, config: PfDialogConfig = {}) {
          const ref = this.dialog.open(
               PfAlertComponent, {
                    ...mergeObjects(this._defaultOptions, config), data: {
                         body: message.body, title: message.title, severity: message.severity
                    }
               }
          );
          ref.afterClosed().pipe(tap(_=> this.alerted$.next(true))).subscribe()
     }

     ngOnDestroy(): void {
          this.alerted$.complete();
     }

}
