enum Status {
  NotFound = 0,
  Success = 1,
  VersionError = 2,
  Error = 4
}

export interface ApprService<ID> {
  approve(id: ID, ctx?: any): Promise<Status>;
  reject(id: ID, ctx?: any): Promise<Status>;
}
