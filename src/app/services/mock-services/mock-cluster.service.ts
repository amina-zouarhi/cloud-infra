import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockClusterService {
  getClusterCpuStats(): Observable<{ usagePercent: number; totalGHz: number }> {
    return of({
      usagePercent: 19.45,
      totalGHz: 132,
    });
  }

  getClusterMemoryStats(): Observable<{
    usagePercent: number;
    totalGiB: number;
  }> {
    return of({
      usagePercent: 38.44,
      totalGiB: 753.92,
    });
  }
}
