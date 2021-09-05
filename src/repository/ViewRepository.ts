import {Attributes} from '../metadata';

export interface ViewRepository<T, ID> {
  metadata(): Attributes;
  keys(): string[];
  all?(ctx?: any): Promise<T[]>;
  load(id: ID, ctx?: any): Promise<T>;
  exist?(id: ID, ctx?: any): Promise<boolean>;
}
