
import {DiffModel} from '../model';

export interface DiffService<T, ID> {
  ids(): string[];
  diff(id: ID, ctx?: any): Promise<DiffModel<T, ID>>;
}
