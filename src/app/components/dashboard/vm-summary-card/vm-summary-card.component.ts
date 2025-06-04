import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { VMService } from '../../../services/vm.service';
import { VMDtoOut } from '../../../models/dtos/vm.dto.out';

@Component({
  selector: 'app-vm-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './vm-summary-card.component.html',
  styleUrls: ['./vm-summary-card.component.scss'],
})
export class VmSummaryCardComponent implements OnInit {
  vms: VMDtoOut[] = [];
  loading = true;
  error: string | null = null;

  constructor(private readonly vmService: VMService) {}

  ngOnInit(): void {
    this.vmService.getVMs().subscribe({
      next: (data) => {
        this.vms = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load VM summary';
        this.loading = false;
        console.error(err);
      },
    });
  }

  get totalVMs(): number {
    return this.vms.length;
  }

  get poweredOn(): number {
    return this.vms.filter(
      (vm) => vm.resources?.power_state?.toLowerCase() === 'on'
    ).length;
  }

  get poweredOff(): number {
    return this.vms.filter(
      (vm) => vm.resources?.power_state?.toLowerCase() === 'off'
    ).length;
  }

  get totalMemory(): number {
    return this.vms.reduce(
      (sum, vm) => sum + (vm.resources?.memory_size_mib || 0),
      0
    );
  }

  get totalCPU(): number {
    return this.vms.reduce(
      (sum, vm) => sum + (vm.resources?.num_threads_per_core || 0),
      0
    );
  }
}
