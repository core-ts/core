import {Attribute} from './metadata';
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
  exec(sql: string, args?: any[], ctx?: any): Promise<number>;
  execBatch(statements: Statement[], firstSuccess?: boolean, ctx?: any): Promise<number>;
  query<T>(sql: string, args?: any[], m?: StringMap, bools?: Attribute[], ctx?: any): Promise<T[]>;
}
export interface Transaction extends Executor {
  commit(): Promise<void>
  rollback(): Promise<void>
  end(): Promise<void>
}
export interface DB extends Executor {
  beginTransaction(): Promise<Transaction>
}
