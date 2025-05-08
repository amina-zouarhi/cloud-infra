import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { CreateVMDto } from '../models/dtos/create.vm.dto';
import { CloneVMDtoIn } from '../models/dtos/clone.vm.dto.in';

@Injectable({
  providedIn: 'root',
})
export class VMService {
  private readonly contextPath = `${environment.api}/vms`;

  constructor(private readonly http: HttpClient) {}

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
