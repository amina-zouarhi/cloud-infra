import { Reference } from './reference.model';

export interface User {
  kind: string; // to migrate to a more specific type: 'user' | 'admin'
  uuid?: string;
  name?: string;
  project_reference?: Reference;
  entity_version?: string;
}
