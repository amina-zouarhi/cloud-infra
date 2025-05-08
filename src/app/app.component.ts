import { Component } from '@angular/core';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ClusterInfoCardComponent } from './components/cluster-info-card/cluster-info-card.component';
import { Cluster } from './models/cluster';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from './common/popups/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    UserInfoComponent,
    ClusterInfoCardComponent,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
  ],
})
export class AppComponent {
  clusters: Cluster[] = [
    { name: 'Cluster CPU Usage', description: 'Cluster 1' },
    { name: 'Cluster Latency', description: 'Cluster 1' },
    { name: 'VMs Summary', description: 'Cluster 1' },
    { name: 'Cluster Memory Usage', description: 'Cluster 1' },
    { name: 'Controller IOPS', description: 'Cluster 1' },
    { name: 'Cluster Storage', description: 'Cluster 1' },
    { name: 'Cost per Usage', description: 'Cluster 1' },
  ];

  constructor(public dialog: MatDialog) {}

  openPopup(mode: 'create' | 'clone' | 'delete'): void {
    this.dialog.open(PopupDialogComponent, {
      minWidth: '700px',
      data: {
        mode,
      },
    });
  }

  createVM(): void {
    this.openPopup('create');
    console.log('VM created');
  }

  deleteVM(): void {
    this.openPopup('delete');
    console.log('VM deleted');
  }

  cloneVM(): void {
    this.openPopup('clone');
    console.log('VM cloned');
  }
}
