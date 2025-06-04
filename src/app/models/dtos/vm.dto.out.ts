export interface VMDtoOut {
  uuid: string;
  name: string;
  state?: 'RUNNING' | 'STOPPED' | 'DELETED' | string;

  description?: string;

  resources?: {
    power_state?: 'ON' | 'OFF' | 'PAUSED' | string;
    num_threads_per_core?: number;
    memory_size_mib?: number;
    num_vcpus_per_socket?: number;
    num_sockets?: number;
  };
}
