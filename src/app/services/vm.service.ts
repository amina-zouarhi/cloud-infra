import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { CreateVMDto } from '../models/dtos/create.vm.dto';
import { CloneVMDtoIn } from '../models/dtos/clone.vm.dto.in';
import { VMDtoOutList } from '../models/dtos/vm.dto.out';

@Injectable({
  providedIn: 'root',
})
export class VMService {
  private readonly contextPath = `${environment.api}/vms`;

  constructor(private readonly http: HttpClient) {}

  getVMs(): Observable<VMDtoOutList> {
    const mockVMs: VMDtoOutList = [
      {
        name: 'VM1',
        cluster_reference: {
          uuid: 'uuid-cluster1',
          kind: 'cluster',
          name: 'Cluster 1',
        },
        resources: {
          num_threads_per_core: 4,
          memory_size_mib: 8192,
        },
        state: 'on',
        description: 'VM1 description',
      },
      {
        name: 'VM2',
        cluster_reference: {
          uuid: 'uuid-cluster1',
          kind: 'cluster',
          name: 'Cluster 1',
        },
        resources: {
          num_threads_per_core: 2,
          memory_size_mib: 4096,
        },
        state: 'off',
        description: 'VM2 description',
      },
      {
        name: 'VM3',
        cluster_reference: {
          uuid: 'uuid-cluster2',
          kind: 'cluster',
          name: 'Cluster 2',
        },
        resources: {
          num_threads_per_core: 8,
          memory_size_mib: 16384,
        },
        state: 'on',
        description: 'VM3 description',
      },
      {
        name: 'VM4',
        cluster_reference: {
          uuid: 'uuid-cluster2',
          kind: 'cluster',
          name: 'Cluster 2',
        },
        resources: {
          num_threads_per_core: 4,
          memory_size_mib: 8192,
        },
        state: 'suspended',
        description: 'VM4 description',
      },
      {
        name: 'VM5',
        cluster_reference: {
          uuid: 'uuid-cluster3',
          kind: 'cluster',
          name: 'Cluster 3',
        },
        resources: {
          num_threads_per_core: 4,
          memory_size_mib: 8192,
        },
        state: 'on',
        description: 'VM5 description',
      },
    ];

    // Simulating an API call with RxJS 'of' (observable)
    return of(mockVMs);
  }

  createVM(uuid: string, createVMDto: CreateVMDto): Observable<void> {
    const path = `${this.contextPath}/${uuid}/acpi_shutdown`;

    return this.http.post<CreateVMDto>(path, createVMDto).pipe(
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
    const url = `${this.contextPath}/${uuid}`;
    return this.http.delete(url).pipe(
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
    const path = `${this.contextPath}/${uuid}/clone`;

    return this.http.post<CreateVMDto>(path, cloneVMDtoIn).pipe(
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
