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
  entityUuid = '';
  taskUuid = '';
  entityVersion = '';

  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record<string, string>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onValidate(): void {
    let result: any;

    switch (this.data['mode']) {
      case 'create':
        result = {
          entityUuid: this.entityUuid,
          taskUuid: this.taskUuid,
        };
        break;

      case 'delete':
        result = { entityUuid: this.entityUuid };
        break;

      case 'clone':
        result = {
          entityUuid: this.entityUuid,
          entityVersion: this.entityVersion,
        };
        break;
    }
    this.dialogRef.close(result);
  }
}
