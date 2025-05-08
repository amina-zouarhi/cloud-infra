import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrl: './popup-dialog.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class PopupDialogComponent {
  input1 = '';
  input2 = '';

  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record<string, string>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onValidate(): void {
    const result =
      this.data['mode'] === 'create'
        ? { input1: this.input1 }
        : { input1: this.input1, input2: this.input2 };

    this.dialogRef.close(result);
  }
}
