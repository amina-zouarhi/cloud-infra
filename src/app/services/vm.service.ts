import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { CreateVMDto } from '../models/dtos/create.vm.dto';
import { CloneVMDtoIn } from '../models/dtos/clone.vm.dto.in';
import { VMDtoOut } from '../models/dtos/vm.dto.out';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VMService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getVMs(): Observable<VMDtoOut[]> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();
    const url = `${clusterUrl}/v3/vms/list`;
    const body = { kind: 'vm', length: 100 };

    return this.http.post<any>(url, body, { headers }).pipe(
      map((res) =>
        res.entities.map((vm: any) => ({
          name: vm.status?.name ?? vm.spec?.name,
          powerState: vm.status?.resources?.power_state ?? 'UNKNOWN',
          uuid: vm.metadata?.uuid,
          resources: vm.status?.resources,
        }))
      )
    );
  }

  createVM(uuid: string, createVMDto: CreateVMDto): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();
    const url = `${clusterUrl}/v3/vms/${uuid}/acpi_shutdown`;

    return this.http.post<CreateVMDto>(url, createVMDto, { headers }).pipe(
      map((vmDto) => {
        console.log(`VM created successfully, task_uuid: ${vmDto.task_uuid}`);
      }),
      catchError((error: any) => {
        console.error('Error creating VM:', error);
        throw error;
      })
    );
  }

  deleteVM(uuid: string): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();
    const url = `${clusterUrl}/v3/vms/${uuid}`;

    return this.http.delete(url, { headers }).pipe(
      map(() => {
        console.log('VM deleted successfully');
      }),
      catchError((error: any) => {
        console.error('Error deleting VM:', error);
        throw error;
      })
    );
  }

  cloneVM(uuid: string, cloneVMDtoIn: CloneVMDtoIn): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    const clusterUrl = this.authService.getClusterUrl();
    const url = `${clusterUrl}/v3/vms/${uuid}/clone`;

    return this.http.post<CreateVMDto>(url, cloneVMDtoIn, { headers }).pipe(
      map((vmDto) => {
        console.log(`VM cloned successfully, task_uuid: ${vmDto.task_uuid}`);
      }),
      catchError((error: any) => {
        console.error('Error cloning VM:', error);
        throw error;
      })
    );
  }
}
