export interface Reference {
  uuid: string;
  kind: string; // to migrate to a more specific type: 'user' | 'vm' | ...
  name?: string;
}
