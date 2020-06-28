import {Model} from '../metadata';

export interface ViewRepository<T, ID> {
  metadata(): Model;
  ids(): string[];
  all?(ctx?: any): Promise<T[]>;
  load(id: ID, ctx?: any): Promise<T>;
  exist?(id: ID): Promise<boolean>;
}
