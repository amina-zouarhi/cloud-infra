import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupDialogComponent } from '../../common/popups/popup-dialog/popup-dialog.component';
import { CloneVMDtoIn } from '../../models/dtos/clone.vm.dto.in';
import { CreateVMDto } from '../../models/dtos/create.vm.dto';
import { VMService } from '../../services/vm.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<boolean>();

  isOpen = true;
  isIAASOpen = true;

  constructor(
    public dialog: MatDialog,
    public vmService: VMService,
    private readonly snackBar: MatSnackBar
  ) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.isOpen);
  }

  toggleIAAS(): void {
    this.isIAASOpen = !this.isIAASOpen;
  }

  openPopup(mode: 'create' | 'delete' | 'clone'): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      minWidth: '700px',
      data: { mode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return; // Dialog was cancelled

      switch (mode) {
        case 'create': {
          const createVMDto: CreateVMDto = { task_uuid: result.taskUuid };

          this.vmService.createVM(result.entityUuid, createVMDto).subscribe({
            next: () => this.showMessage('VM created successfully.'),
            error: () => this.showMessage('Failed to create VM.', true),
          });
          break;
        }

        case 'delete': {
          this.vmService.deleteVM(result.entityUuid).subscribe({
            next: () => this.showMessage('VM deleted successfully.'),
            error: () => this.showMessage('Failed to delete VM.', true),
          });
          break;
        }

        case 'clone': {
          const cloneVmDto: CloneVMDtoIn = {
            metadata: {
              uuid: result.entityUuid,
              entity_version: result.entityVersion,
            },
          };
          this.vmService.cloneVM(result.entityUuid, cloneVmDto).subscribe({
            next: () => this.showMessage('VM cloned successfully.'),
            error: () => this.showMessage('Failed to clone VM.', true),
          });
          break;
        }
      }
    });
  }

  showMessage(message: string, isError = false): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: isError ? ['snack-bar-error'] : ['snack-bar-success'],
    });
  }
}
