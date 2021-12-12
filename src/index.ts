export {Locale} from './formatter';

export * from './db';

export {Mapper} from './formatter';
export {LocaleMapper} from './formatter';
export {Formatter} from './formatter';
export {LocaleFormatter} from './formatter';
export {StringFormatter} from './formatter';
export {LocaleStringFormatter} from './formatter';

export * from './metadata';

export {CacheService} from './cache';
export {SyncCacheService} from './cache';

export {Validator} from './validator';
export {SyncValidator} from './validator';

export {ValueGenerator} from './loader';
export {IdGenerator} from './loader';

export {Generator} from './loader';
export {Loader} from './loader';
export {UniqueValueBuilder} from './loader';

export {DataLoader} from './loader';

export * from './model';

import {GenericRepository} from './repository/GenericRepository';
export {GenericRepository as Repository};

export * from './repository/ViewRepository';
export * from './repository/GenericRepository';
export * from './repository/SearchRepository';
export * from './repository/ViewSearchRepository';
export * from './repository/GenericSearchRepository';

import {GenericSearchService} from './service/GenericSearchService';
export {GenericSearchService as Service};

export * from './service/ViewService';
export * from './service/GenericService';
export * from './service/SearchService';
export * from './service/ViewSearchService';
export * from './service/GenericSearchService';
export * from './service/DiffService';
export * from './service/ApprService';
export * from './service/DiffApprService';
export * from './service/GenericSearchDiffApprService';

export * from './mail/model/AttachmentData';
export * from './mail/model/TrackingSettings';
export * from './mail/model/EmailData';
export * from './mail/model/MailData';
export * from './mail/model/MailContent';
export * from './mail/model/PersonalizationData';
export * from './mail/model/MailSettings';
export * from './mail/model/ASMOptions';
export * from './mail/service/MailService';
export * from './mail/config';

export * from './location';
export * from './video';
export * from './health';
export * from './logger';

import { Attributes } from './metadata';
import { Filter, SearchResult } from './model';
// import { GenericRepository } from './repository/GenericRepository';
import { ViewRepository } from './repository/ViewRepository';
// import { GenericSearchService } from './service/GenericSearchService';
import { GenericService } from './service/GenericService';
import { ViewService } from './service/ViewService';

export type Search<T, F> = (s: F, limit?: number, offset?: number | string, fields?: string[]) => Promise<SearchResult<T>>;
export type SearchFunc<T, F> = Search<T, F>;

export class ViewManager<T, ID> implements ViewService<T, ID> {
  constructor(private r: ViewRepository<T, ID>) {
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.all = this.all.bind(this);
    this.load = this.load.bind(this);
    this.exist = this.exist.bind(this);
  }
  metadata(): Attributes|undefined {
    return (this.r.metadata ? this.r.metadata() : undefined);
  }
  keys(): string[] {
    return (this.r.keys ? this.r.keys() : []);
  }
  all(ctx?: any): Promise<T[]> {
    return (this.r.all ? this.r.all() : Promise.resolve([]));
  }
  load(id: ID, ctx?: any): Promise<T | null> {
    return this.r.load(id, ctx);
  }
  exist(id: ID, ctx?: any): Promise<boolean> {
    return (this.r.exist ? this.r.exist(id, ctx) : Promise.resolve(false));
  }
}
export class GenericManager<T, ID> extends ViewManager<T, ID> implements GenericService<T, ID, number> {
  constructor(protected repository: GenericRepository<T, ID>) {
    super(repository);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }
  insert(obj: T, ctx?: any): Promise<number> {
    return this.repository.insert(obj, ctx);
  }
  update(obj: T, ctx?: any): Promise<number> {
    return this.repository.update(obj, ctx);
  }
  patch(obj: T, ctx?: any): Promise<number> {
    return (this.repository.patch ? this.repository.patch(obj, ctx) : Promise.resolve(-1));
  }
  save(obj: T, ctx?: any): Promise<number> {
    return (this.repository.save ? this.repository.save(obj, ctx) : Promise.resolve(-1));
  }
  delete(id: ID, ctx?: any): Promise<number> {
    return (this.repository.delete ? this.repository.delete(id, ctx) : Promise.resolve(-1));
  }
}
export class Manager<T, ID, F extends Filter> extends GenericManager<T, ID> implements GenericSearchService<T, ID, number, F> {
  constructor(public find: Search<T, F>, repo: GenericRepository<T, ID>) {
    super(repo);
    this.search = this.search.bind(this);
  }
  search(s: F, limit?: number, offset?: number|string, fields?: string[]): Promise<SearchResult<T>> {
    return this.find(s, limit, offset, fields);
  }
}
export const DefaultViewService = ViewManager;
export const DefaultGenericService = GenericManager;
export const GenericSearchManager = Manager;
export const DefaultService = GenericManager;
export const DefaultGenericSearchService = GenericManager;
