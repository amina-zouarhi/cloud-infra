import { Component, Input } from '@angular/core';
import { Cluster } from '../../models/cluster';

@Component({
  selector: 'app-cluster-info-card',
  imports: [],
  templateUrl: './cluster-info-card.component.html',
  styleUrl: './cluster-info-card.component.scss',
})
export class ClusterInfoCardComponent {
  @Input() cluster!: Cluster;
}
