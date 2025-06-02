import { Reference } from './reference.model';

export interface VM {
  name: string;
  cluster_reference: Reference;
  resources: Resources;
  state?: string;
  description?: string;
}

export interface Resources {
  num_threads_per_core: number;
  memory_size_mib: number;
  // ... add extra resource attributes if needed
}
