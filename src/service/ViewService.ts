import {Attributes} from '../metadata';

export interface ViewService<T, ID> {
  metadata?(): Attributes;
  keys?(): string[];
  all?(ctx?: any): Promise<T[]>;
  load(id: ID, ctx?: any): Promise<T|null>;
  exist?(id: ID, ctx?: any): Promise<boolean>;
}
