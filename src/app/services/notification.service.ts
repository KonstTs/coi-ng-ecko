import { Injectable, Injector } from '@angular/core';
import { PfAlertComponent, PfConfirmComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PF_DEFAULT_DIALOG_CONFIG, PfDialogMsg } from '../config/base-notification';
import { mergeObjects } from '../shared/utils';


@Injectable()
export class PfNotificationService {
     title = 'matDialog';
     data: any;
     private _defaultOptions = structuredClone(PF_DEFAULT_DIALOG_CONFIG);

     constructor(private dialog: MatDialog, protected Injector: Injector) { }

     alert(msg: PfDialogMsg, config: MatDialogConfig = {}) {
          // const dialogRef: MatDialogRef<PfAlertComponent> =
          console.log('this._defaultOptions', this._defaultOptions)
          return this.dialog.open(PfAlertComponent, { ...this_defaultOptions, config, data: msg });
     }

     confirm(msg: PfDialogMsg, config: MatDialogConfig = {}) {
          return this.dialog.open(PfConfirmComponent, { ...mergeObjects(this._defaultOptions, config), data: msg });
     }
}
