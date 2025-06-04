import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VMDtoOut } from '../../models/dtos/vm.dto.out';
import { MOCK_VM_LIST } from '../../mocks/mock-vm.data';
import { CreateVMDto } from '../../models/dtos/create.vm.dto';
import { CloneVMDtoIn } from '../../models/dtos/clone.vm.dto.in';

@Injectable()
export class MockVMService {
  getVMs(): Observable<VMDtoOut[]> {
    return of(MOCK_VM_LIST).pipe(delay(300));
  }

  createVM(uuid: string, dto: CreateVMDto): Observable<void> {
    console.log(`(Mock) Creating VM: ${uuid}`, dto);
    return of(void 0).pipe(delay(300));
  }

  deleteVM(uuid: string): Observable<void> {
    console.log(`(Mock) Deleting VM: ${uuid}`);
    return of(void 0).pipe(delay(300));
  }

  cloneVM(uuid: string, dto: CloneVMDtoIn): Observable<void> {
    console.log(`(Mock) Cloning VM: ${uuid}`, dto);
    return of(void 0).pipe(delay(300));
  }
}
