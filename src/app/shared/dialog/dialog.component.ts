import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogClose, MatDialogActions } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'pf-alert',
  imports: [MatIcon],
  standalone: true,
  template: `
    <div class="pf-alert">
      <mat-icon aria-hidden="false" (click)="closeAlert()"> close </mat-icon>
      <p>{{ message }}</p>
    </div>
  `
})
export class PfAlertComponent {
  message: string = '';

  constructor(
    
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    private dialogRef: MatDialogRef<PfAlertComponent>,
  ) {
    console.log('data:', data)
    this.message = data ? data.message : '';
  }

  closeAlert() {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'pf-confirm',
  imports: [MatButton, MatDialogTitle, MatDialogClose, MatDialogActions ],
  standalone: true,
  template: `
    <div class="confirm-container">
      <h1 mat-dialog-title>Are you sure?</h1>
      <div mat-dialog-content> {{ message }}</div>

      <div mat-dialog-actions style="float:right;margin:20px;">
        <button mat-button [mat-dialog-close]="{ clicked: 'Ok' }">Ok</button>
        <button mat-button [mat-dialog-close]="{ clicked: 'Cancel' }">Cancel</button>
      </div>
  </div>
  `
})
export class PfConfirmComponent {
  message = '';

  constructor(
    private dialogRef: MatDialogRef<PfConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }
}

