import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with 'false'
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Close dialog with 'true'
  }
}
