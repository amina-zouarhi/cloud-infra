import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ClusterService } from '../../../services/cluster.service';

@Component({
  selector: 'app-cluster-cpu-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './cluster-cpu-card.component.html',
  styleUrl: './cluster-cpu-card.component.scss',
})
export class ClusterCpuCardComponent {
  cpuUsage: number | null = null;
  totalGHz: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private readonly clusterService: ClusterService) {}

  ngOnInit(): void {
    this.clusterService.getClusterCpuStats().subscribe({
      next: ({ usagePercent, totalGHz }) => {
        this.cpuUsage = usagePercent;
        this.totalGHz = totalGHz;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cluster CPU usage';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
