import {ViewService} from './ViewService';

export interface GenericService<T, ID, R> extends ViewService<T, ID> {
  insert(obj: T, ctx?: any): Promise<R>;
  update(obj: T, ctx?: any): Promise<R>;
  patch(obj: T, ctx?: any): Promise<R>;
  save?(obj: T, ctx?: any): Promise<R>;
  delete(id: ID, ctx?: any): Promise<number>;
}
