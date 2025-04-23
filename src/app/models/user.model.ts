export interface User {
  kind: string; // to migrate to a more specific type: 'user' | 'admin'
  uuid?: string;
  name?: string;
  project_reference?: ProjectReference;
  entity_version?: string;
}

export interface ProjectReference {
  uuid: string;
  kind: string; // to migrate to a more specific type: 'user' | 'admin'
  name?: string;
}
