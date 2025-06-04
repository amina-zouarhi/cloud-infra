import { VMDtoOut } from '../models/dtos/vm.dto.out';

export const MOCK_VM_LIST: VMDtoOut[] = [
  {
    uuid: 'vm-001',
    name: 'Dev Server',
    state: 'RUNNING',
    description: 'Development virtual machine',
    resources: {
      power_state: 'ON',
      num_threads_per_core: 2,
      memory_size_mib: 8192,
      num_vcpus_per_socket: 2,
      num_sockets: 1,
    },
  },
  {
    uuid: 'vm-002',
    name: 'Staging Server',
    state: 'STOPPED',
    description: 'Staging environment',
    resources: {
      power_state: 'OFF',
      num_threads_per_core: 1,
      memory_size_mib: 4096,
      num_vcpus_per_socket: 1,
      num_sockets: 2,
    },
  },
  {
    uuid: 'vm-003',
    name: 'Clone In Progress',
    state: 'CLONING',
    description: 'Temporary clone operation',
    resources: {
      power_state: 'OFF',
      num_threads_per_core: 2,
      memory_size_mib: 16384,
      num_vcpus_per_socket: 4,
      num_sockets: 1,
    },
  },
  {
    uuid: 'vm-004',
    name: 'QA Machine',
    state: 'SUSPENDED',
    description: 'Paused for review',
    resources: {
      power_state: 'PAUSED',
      num_threads_per_core: 2,
      memory_size_mib: 12288,
      num_vcpus_per_socket: 2,
      num_sockets: 2,
    },
  },
  {
    uuid: 'vm-005',
    name: 'VM with Error',
    state: 'ERROR',
    description: 'Failed to boot properly',
    resources: {
      power_state: 'OFF',
      num_threads_per_core: 1,
      memory_size_mib: 2048,
      num_vcpus_per_socket: 1,
      num_sockets: 1,
    },
  },
];
