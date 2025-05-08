export interface CloneVMDtoIn {
  // Metadata of the cloned VM
  metadata: CloneVMMetadata;

  // add 'override_spec' if needed
}

export interface CloneVMMetadata {
  uuid: string;

  // Logical entity version of the VM from which to clone the new VM
  entity_version?: string;
}
