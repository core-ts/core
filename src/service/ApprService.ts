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
export interface ApprListService<ID> {
  approve(ids: ID[], ctx?: any): Promise<Status>;
  reject(ids: ID[], ctx?: any): Promise<Status>;
}

export interface ApprRepository<ID> {
  approve(id: ID, ctx?: any): Promise<Status>;
  reject(id: ID, ctx?: any): Promise<Status>;
}
export interface ApprListRepository<ID> {
  approve(ids: ID[], ctx?: any): Promise<Status>;
  reject(ids: ID[], ctx?: any): Promise<Status>;
}
