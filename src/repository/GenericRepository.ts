import {ViewRepository} from './ViewRepository';

export interface GenericRepository<T, ID, R> extends ViewRepository<T, ID> {
  insert(obj: T, ctx?: any): Promise<R>;
  update(obj: T, ctx?: any): Promise<R>;
  patch?(obj: T, ctx?: any): Promise<R>;
  save?(obj: T, ctx?: any): Promise<R>;
  delete?(id: ID, ctx?: any): Promise<number>;
}
