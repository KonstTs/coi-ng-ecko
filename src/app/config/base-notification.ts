import { Type, Injector } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";

export type PfSeverity = 'success' | 'info' | 'warning' | 'error';
export type PfDialogMsg = {title?:string, body?:string, severity?:PfSeverity};

export class PfNotificationContext<T> {
  constructor(public id: string) {}
  close: (result?: unknown) => void;
  data: T;
}

export interface PfDialogConfig extends MatDialogConfig { severity?:PfSeverity}

export const PF_DEFAULT_DIALOG_CONFIG: MatDialogConfig<PfDialogConfig> = {
  position: { top: '60px', right: '60px' },
  hasBackdrop: true,
  backdropClass: 'pf-dialog-backdrop',
  panelClass: 'pf-dialog-panel-class',
  minWidth: '160px',
  minHeight: '120px',
  maxHeight: '300px',
  maxWidth: '400px'
}


