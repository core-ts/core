import { Filter, Result, SearchResult } from './model';
import { Attributes } from './metadata';

export interface ViewService<T, ID> {
  metadata?(): Attributes|undefined;
  keys?(): string[];
  load(id: ID): Promise<T|null>;
}

export interface SearchService<T, F extends Filter> {
  keys?(): string[];
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>>;
}

export interface Query<T, ID, F extends Filter> extends SearchService<T, F> {
  metadata?(): Attributes|undefined;
  load(id: ID): Promise<T|null>;
}
export interface QueryService<T, ID, F extends Filter> extends SearchService<T, F> {
  metadata?(): Attributes|undefined;
  load(id: ID): Promise<T|null>;
}
export interface QueryRepository<T, ID, F extends Filter> extends SearchService<T, F> {
  metadata?(): Attributes|undefined;
  load(id: ID): Promise<T|null>;
}

export interface GenericService<T, ID, R> extends ViewService<T, ID> {
  create(obj: T): Promise<R>;
  update(obj: T): Promise<R>;
  patch(obj: Partial<T>): Promise<R>;
  delete(id: ID): Promise<number>;
}

export interface ViewSearchService<T, ID, F extends Filter>
  extends ViewService<T, ID>, SearchService<T, F> {
}

export interface GenericSearchService<T, ID, R, F extends Filter>
  extends GenericService<T, ID, R>, SearchService<T, F> {
}

export interface Service<T, ID, F extends Filter>
  extends GenericService<T, ID, Result<T>>, SearchService<T, F> {
}
