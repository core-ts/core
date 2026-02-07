import { Attribute, Attributes } from './metadata';
import { Filter, SearchResult } from './model';
export interface Statement {
  query: string;
  params?: any[];
}
export interface QueryBuilder {
  build(cxt?: any): Promise<Statement>;
}
export interface SimpleDB {
  driver: string;
  query<T>(sql: string): Promise<T[]>;
}
interface StringMap {
  [key: string]: string;
}
export interface Executor {
  driver: string;
  param(i: number): string;
  exec(sql: string, args?: any[], tx?: Transaction): Promise<number>;
  execBatch(statements: Statement[], firstSuccess?: boolean, tx?: Transaction): Promise<number>;
  query<T>(sql: string, args?: any[], m?: StringMap, bools?: Attribute[], tx?: Transaction): Promise<T[]>;
}
export interface Transaction extends Executor {
  commit(): Promise<void>
  rollback(): Promise<void>
  end(): Promise<void>
}
export interface DB extends Executor {
  beginTransaction(): Promise<Transaction>
}

export interface ViewRepository<T, ID> {
  metadata?(): Attributes|undefined;
  keys?(): string[];
  load(id: ID, tx?: Transaction): Promise<T|null>;
}
export interface SearchRepository<T, F extends Filter> {
  search(s: F, limit: number, offset?: number|string, fields?: string[], tx?: Transaction): Promise<SearchResult<T>>;
}
export interface ViewSearchRepository<T, ID, F extends Filter>
  extends ViewRepository<T, ID>, SearchRepository<T, F> {
}
export interface GenericRepository<T, ID> extends ViewRepository<T, ID> {
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
export interface CRUDRepository<T, ID> extends ViewRepository<T, ID> {
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
export interface Repository<T, ID, F extends Filter>
  extends GenericRepository<T, ID>, SearchRepository<T, F> {
}
export interface GenericSearchRepository<T, ID, F extends Filter>
  extends GenericRepository<T, ID>, SearchRepository<T, F> {
}
export interface ApproversRepository {
  getApprovers(tx?: Transaction): Promise<string[]>
}
export interface HistoryRepository<T> {
  create(id: string, author: string, action: string, data: T, tx?: Transaction): Promise<number>
}


export interface ViewPort<T, ID> {
  metadata?(): Attributes|undefined;
  keys?(): string[];
  load(id: ID, tx?: Transaction): Promise<T|null>;
}
export interface SearchPort<T, F extends Filter> {
  search(s: F, limit: number, offset?: number|string, fields?: string[], tx?: Transaction): Promise<SearchResult<T>>;
}
export interface ViewSearchPort<T, ID, F extends Filter>
  extends ViewPort<T, ID>, SearchPort<T, F> {
}
export interface GenericPort<T, ID> extends ViewPort<T, ID> {
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
export interface CRUDPort<T, ID> extends ViewPort<T, ID> {
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
export interface Port<T, ID, F extends Filter>
  extends GenericPort<T, ID>, SearchPort<T, F> {
}
export interface GenericSearchPort<T, ID, F extends Filter>
  extends GenericPort<T, ID>, SearchPort<T, F> {
}
export interface ApproversPort {
  getApprovers(tx?: Transaction): Promise<string[]>
}
export interface HistoryPort<T> {
  create(id: string, author: string, action: string, data: T, tx?: Transaction): Promise<number>
}
