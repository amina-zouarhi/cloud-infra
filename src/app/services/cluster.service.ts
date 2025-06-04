import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClusterService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  // TODO: call the right API
  getClusterCpuStats(): Observable<{ usagePercent: number; totalGHz: number }> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();

    // hypervisor_cpu_usage_ppm exists in v2, to retrieve it in v3 please dig further on how to compute these stats
    const url = `${clusterUrl}/v3/clusters/list`;

    return this.http.post<any>(url, {}, { headers }).pipe(
      map((response) => {
        const cluster = response.entities[0];
        const stats = cluster.stats;

        const usagePpm = +(stats?.hypervisor_cpu_usage_ppm ?? 0);
        const numCores = +(stats?.num_cpu_cores ?? 0);
        const capacityHz = +(stats?.cpu_capacity_hz ?? 0);
        const totalHz = numCores * capacityHz;

        const usagePercent = usagePpm / 10000;
        const totalGHz = totalHz / 1e9;

        return { usagePercent, totalGHz };
      })
    );
  }

  // TODO: call the right API
  getClusterMemoryStats(): Observable<{
    usagePercent: number;
    totalGiB: number;
  }> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();

    // hypervisor_cpu_usage_ppm exists in v2, to retrieve it in v3 please dig further on how to compute these stats
    const url = `${clusterUrl}/v3/clusters/list`;

    return this.http.post<any>(url, {}, { headers }).pipe(
      map((response) => {
        const cluster = response.entities[0];
        const stats = cluster.stats;

        const usagePpm = +stats['memory_usage_ppm'] || 0;
        const capacityBytes = +stats['memory_capacity_bytes'] || 1;

        const usagePercent = usagePpm / 10_000;
        const totalGiB = capacityBytes / 1024 ** 3;

        return { usagePercent, totalGiB };
      })
    );
  }
}
