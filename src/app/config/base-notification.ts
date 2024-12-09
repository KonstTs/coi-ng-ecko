import { Type, Injector } from "@angular/core";
import { DialogPosition, MatDialogConfig } from "@angular/material/dialog";

export type PfSeverity = 'success' | 'info' | 'warn' | 'error';
export type PfDialogMsg = {title:string, body:string};

export class PfNotificationContext<T> {
  constructor(public id: string) {}
  close: (result?: unknown) => void;
  data: T;
}

export const PF_DEFAULT_DIALOG_CONFIG: MatDialogConfig = {
  position: { top: '60px', right: '60px' },
  hasBackdrop: true,
  backdropClass: 'pf-dialog-backdrop',
  panelClass: 'pf-dialog-panel-class',
  width: '160px',
  height: '120px',
}


