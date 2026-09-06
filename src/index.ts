export type DataType = 'ObjectId' | 'date' | 'datetime' | 'time'
  | 'boolean' | 'number' | 'integer' | 'string' | 'text'
  | 'object' | 'array' | 'binary'
  | 'primitives' | 'booleans' | 'numbers' | 'integers' | 'strings' | 'dates' | 'datetimes' | 'times';
export type FormatType = 'currency' | 'percentage' | 'email' | 'url' | 'phone' | 'fax' | 'ipv4' | 'ipv6';
export type Operator = "=" | "like" | "!=" | "<>" | ">" | ">=" | "<" | "<="

export interface Model {
  name?: string;
  attributes: Attributes;
  source?: string;
  table?: string;
  collection?: string;
  // for mongo lowcode
  sort?: string;
  geo?: string;
  latitude?: string;
  longitude?: string;
}
export interface Attribute {
  name?: string;
  field?: string;
  column?: string;
  type?: DataType;
  format?: FormatType;
  required?: boolean;
  operator?: Operator;
  default?: string|number|Date|boolean;
  key?: boolean;
  unique?: boolean;
  enum?: string[] | number[];
  q?: boolean;
  noinsert?: boolean;
  noupdate?: boolean;
  nopatch?: boolean;
  version?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  length?: number;
  min?: number | Date | string;
  max?: number | Date | string;
  gt?: number | Date | string;
  lt?: number | Date | string;
  precision?: number;
  scale?: number;
  exp?: RegExp | string;
  code?: string;
  noformat?: boolean;
  ignored?: boolean;
  jsonField?: string;
  link?: string;
  typeof?: Attributes;
  true?: string|number;
  false?: string|number;
  noValidate?: boolean;
  resource?: string;
  getString?: (v: any) => string;
}
export interface Attributes {
  [key: string]: Attribute;
}

export interface Filter {
  page?: number;
  limit: number;
  fields?: string[];
  sort?: string;

  q?: string;
}
export interface SearchResult<T> {
  list: T[];
  total?: number;
  next?: string;
}


export interface Statement {
  query: string;
  params?: any[];
}
interface StringMap {
  [key: string]: string;
}
export interface Executor {
  driver: string
  param(i: number): string
  execute(sql: string, args?: any[]): Promise<number>
  executeBatch(statements: Statement[], firstSuccess?: boolean): Promise<number>
  query<T>(sql: string, args?: any[], m?: StringMap, bools?: Attribute[]): Promise<T[]>
}
export interface Transaction extends Executor {
  commit(): Promise<void>
  rollback(): Promise<void>
}
export interface DB extends Executor {
  beginTransaction(): Promise<Transaction>
}

export interface SearchRepository<T, F extends Filter> {
  search(s: F, limit: number, offset?: number|string, fields?: string[], tx?: Transaction): Promise<SearchResult<T>>;
}
export interface CRUDRepository<T, ID> {
  load(id: ID, tx?: Transaction): Promise<T | null>;
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
export interface Repository<T, ID, F extends Filter>
  extends CRUDRepository<T, ID>, SearchRepository<T, F> {
}

export interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
  message?: string;
}
export type Result<T> = number | T | ErrorMessage[];
export interface SearchService<T, F extends Filter> {
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>>;
}
export interface CRUDService<T, ID> {
  load(id: ID): Promise<T|null>;
  create(obj: T): Promise<Result<T>>;
  update(obj: T): Promise<Result<T>>;
  patch(obj: Partial<T>): Promise<Result<T>>;
  delete(id: ID): Promise<number>;
}
export interface Service<T, ID, F extends Filter>
  extends CRUDService<T, ID>, SearchService<T, F> {
}

export class SearchUseCase<T, F extends Filter> {
  constructor(protected repository: SearchRepository<T, F>) {
    this.search = this.search.bind(this);
  }
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(s, limit, page, fields);
  }
}

export class CRUDUseCase<T, ID> implements CRUDService<T, ID> {
  constructor(protected repository: CRUDRepository<T, ID>) {
    this.load = this.load.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
  }
  load(id: ID): Promise<T | null> {
    return this.repository.load(id);
  }
  create(obj: T): Promise<number> {
    return this.repository.create(obj);
  }
  update(obj: T): Promise<number> {
    return this.repository.update(obj);
  }
  patch(obj: Partial<T>): Promise<number> {
    return this.repository.patch(obj);
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id);
  }
}

export class UseCase<T, ID, F extends Filter> {
  constructor(protected repository: Repository<T, ID, F>) {
    this.search = this.search.bind(this);
    this.load = this.load.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
  }
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(s, limit, page, fields);
  }
  load(id: ID): Promise<T | null> {
    return this.repository.load(id);
  }
  create(obj: T): Promise<number> {
    return this.repository.create(obj);
  }
  update(obj: T): Promise<number> {
    return this.repository.update(obj);
  }
  patch(obj: Partial<T>): Promise<number> {
    return (this.repository.patch ? this.repository.patch(obj) : Promise.resolve(-1));
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id);
  }
}
