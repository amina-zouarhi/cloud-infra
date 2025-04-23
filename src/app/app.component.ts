import { Component } from '@angular/core';
import { SlidingMenuComponent } from './components/sliding-menu/sliding-menu.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ClusterInfoCardComponent } from './components/cluster-info-card/cluster-info-card.component';
import { Cluster } from './models/cluster';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    SlidingMenuComponent,
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
}
