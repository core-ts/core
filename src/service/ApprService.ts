import {Status} from '../model';

export interface ApprService<ID> {
  approve(id: ID, ctx?: any): Promise<Status>;
  reject(id: ID, ctx?: any): Promise<Status>;
}
