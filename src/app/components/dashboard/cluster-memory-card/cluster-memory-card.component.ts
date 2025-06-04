import { Component } from '@angular/core';
import { ClusterService } from '../../../services/cluster.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cluster-memory-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './cluster-memory-card.component.html',
  styleUrl: './cluster-memory-card.component.scss',
})
export class ClusterMemoryCardComponent {
  cpuUsage: number | null = null;
  totalGiB: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private readonly clusterService: ClusterService) {}

  ngOnInit(): void {
    this.clusterService.getClusterMemoryStats().subscribe({
      next: ({ usagePercent, totalGiB }) => {
        this.cpuUsage = usagePercent;
        this.totalGiB = totalGiB;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cluster memory usage';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
