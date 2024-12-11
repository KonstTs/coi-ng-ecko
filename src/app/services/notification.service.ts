import { Injectable, Injector } from '@angular/core';
import { PfAlertComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PF_DEFAULT_DIALOG_CONFIG, PfDialogConfig, PfDialogMsg, PfSeverity } from '../config/base-notification';
import { mergeObjects } from '../shared/utils';


@Injectable()
export class PfNotificationService {
     title = 'matDialog';
     data: any;
     private _defaultOptions = structuredClone(PF_DEFAULT_DIALOG_CONFIG);

     constructor(private dialog: MatDialog, protected Injector: Injector) { }

     alert(message:PfDialogMsg, config: PfDialogConfig = {}) {
          const ref = this.dialog.open(
               PfAlertComponent, {
                    ...mergeObjects(this._defaultOptions, config), data: {
                         body: message.body, title: message.title, severity: message.severity
                    }
               }
          );
          ref.afterClosed().subscribe(_=> console.log('do sth nice'))
     }

}
