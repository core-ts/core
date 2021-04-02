type StatusType = 0 | 1 | 2 | 4;
export interface ApprService<ID> {
  approve(id: ID, ctx?: any): Promise<StatusType>;
  reject(id: ID, ctx?: any): Promise<StatusType>;
}
export interface ApprListService<ID> {
  approve(ids: ID[], ctx?: any): Promise<StatusType>;
  reject(ids: ID[], ctx?: any): Promise<StatusType>;
}

export interface ApprRepository<ID> {
  approve(id: ID, ctx?: any): Promise<StatusType>;
  reject(id: ID, ctx?: any): Promise<StatusType>;
}
export interface ApprListRepository<ID> {
  approve(ids: ID[], ctx?: any): Promise<StatusType>;
  reject(ids: ID[], ctx?: any): Promise<StatusType>;
}
