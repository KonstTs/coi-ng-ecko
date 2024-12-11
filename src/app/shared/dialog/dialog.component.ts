import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PfSeverity } from '../../config/base-notification';
import { PfButtonComponent, PfButtonConfig } from "../structure/button/button.component";
import { color } from 'echarts';



@Component({
  selector: 'pf-alert',
  imports: [PfButtonComponent],
  standalone: true,
  template: `
    <div [class]="'pf-alert --'+severity">
      <div class="_header">
        
        <h3 class="_title  pf-ai-center-flex">
          <span class="pf-icon material-symbols-outlined">{{icons[severity]}}</span>
          <span>{{title}}</span>
      </h3>
      </div>
      <div class="_body">{{body}}</div>
      <div class="_footer">
        <pf-button class="pf-btn-default" [config]="cta">Got it!</pf-button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class PfAlertComponent {
  title: string;
  body: string;
  placehoder: string = `
  If error is caused by user eg bad request
  due to user not having provided needed info,
  inform user about it and ask to repeat action.
  If error was caused by other reasons, eg timeouts or 500 maybe
  try to repeat oncee more in the background`;
  severity: PfSeverity;
  cta: PfButtonConfig;
  icons = {
    error: 'skull',
    warning: 'error',
    success: 'check_circle',
    info: 'info'
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { title: string, body: string, severity: PfSeverity })
  {
    const { title, body, severity } = data;
    this.severity = severity ?? 'error';
    this.title = title ?? this.severity;
    this.body = body ?? this.placehoder;
    this.cta = { label: 'Got it!', icon: 'close', default: true, color: '#fff'}
  }

}

