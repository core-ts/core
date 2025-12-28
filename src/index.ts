export * from './db';

export * from './formatter';
export * from './metadata';
export * from './cache';
export * from './validator';
export * from './loader';
export * from './model';

import {GenericRepository} from './repository/GenericRepository';

export * from './repository/ViewRepository';
export * from './repository/GenericRepository';
export * from './repository/SearchRepository';
export * from './repository/ViewSearchRepository';
export * from './repository/GenericSearchRepository';

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
export * from './mail/config';

export * from './location';
export * from './video';
export * from './health';
export * from './logger';

export type DeleteFile = (name: string, directory?: string) => Promise<boolean>;
export type Delete = (delFile: DeleteFile, url: string) => Promise<boolean>;
export type BuildUrl = (name: string, directory?: string) => string;
export type Generate = () => string;
export type SaveValues = (values: string[]) => Promise<number>;
export type SaveStrings = (values: string[]) => Promise<number>;
export interface QueryService<T> {
  query(keyword: string, max?: number): Promise<T[]>;
}
export type Get<T> = (keyword: string, max?: number) => Promise<T[]>;
export type Load<T> = (keyword: string, max?: number) => Promise<T[]>;
export type Log = (msg: string) => void;
export type LogFunc = Log;

import { Attributes } from './metadata';
import { ErrorMessage, Filter, SearchResult } from './model';
import { GenericSearchService } from './service/GenericSearchService';
import { GenericService } from './service/GenericService';
import { SearchRepository } from './repository/SearchRepository';
import { GenericSearchRepository } from './repository/GenericSearchRepository';

export type Search<T, F> = (s: F, limit: number, page?: number | string, fields?: string[]) => Promise<SearchResult<T>>;
export type SearchFunc<T, F> = Search<T, F>;

export interface KeypairResult {
  rsaEncrypted: string;
  data: {
    shareKey: string;
    salt: string;
  };
}
export interface CryptoOption {
  isEncoded64?: boolean;
  convertKey2Bytes?: boolean;
}
export interface CryptoPort {
  exchangeKeypair: (pk: string) => Promise<KeypairResult>;
  encryptAESMessage: (aesKey: string, salt: string, dataJSON: string,  options?: CryptoOption) => Promise<string>;
  decryptAESMessage: <T>(messageEncrypted: string, clientShKey: string, clientSalt: string, options?: CryptoOption) => Promise<T | string>;
  encrypt: (pk: any, message: string) => string;
  decrypt: (sk: any, data: string) => string;
  encryptAES: (key: string, message: string) => string;
  decryptAES: (key: string, ciphertext: string, iv: string) => string;
  hashHMAC: (key: string, data: string) => string;
  hashData: (text: string) => string;
}
export interface CryptoService {
  exchangeKeypair: (pk: string) => Promise<KeypairResult>;
  encryptAESMessage: (aesKey: string, salt: string, dataJSON: string,  options?: CryptoOption) => Promise<string>;
  decryptAESMessage: <T>(messageEncrypted: string, clientShKey: string, clientSalt: string, options?: CryptoOption) => Promise<T | string>;
  encrypt: (pk: any, message: string) => string;
  decrypt: (sk: any, data: string) => string;
  encryptAES: (key: string, message: string) => string;
  decryptAES: (key: string, ciphertext: string, iv: string) => string;
  hashHMAC: (key: string, data: string) => string;
  hashData: (text: string) => string;
}

export interface ExceptionHandler {
  handleException(rs: string, err: any, i?: number, filename?: string): void;
}
export interface ImportResult {
  total: number;
  success: number;
}
export interface ImportService {
  import(): Promise<ImportResult>;
}
export interface Importer {
  import(): Promise<ImportResult>;
}
export interface Parser<T> {
  parse: (data: string) => Promise<T>;
}
export interface Transformer<T> {
  transform: (data: string) => Promise<T>;
}
export interface ExportService {
  export(ctx?: any): Promise<number>;
}
export interface Exporter {
  export(ctx?: any): Promise<number>;
}

// tslint:disable-next-line:max-classes-per-file
export class SearchUseCase<T, F extends Filter> {
  constructor(protected repository: SearchRepository<T, F>) {
    this.search = this.search.bind(this);
  }
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(s, limit, page, fields);
  }
}
export const SearchManager = SearchUseCase

interface WriterRepo<T> {
  create(obj: T, ctx?: any): Promise<number>;
  update(obj: T, ctx?: any): Promise<number>;
  patch(obj: Partial<T>, ctx?: any): Promise<number>;
}
// tslint:disable-next-line:max-classes-per-file
export class Writer<T> {
  constructor(protected repository: WriterRepo<T>) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
  }
  create(obj: T, ctx?: any): Promise<number> {
    return this.repository.create(obj, ctx);
  }
  update(obj: T, ctx?: any): Promise<number> {
    return this.repository.update(obj, ctx);
  }
  patch(obj: Partial<T>, ctx?: any): Promise<number> {
    return (this.repository.patch ? this.repository.patch(obj, ctx) : Promise.resolve(-1));
  }
}

interface SearchWriterRepo<T, F extends Filter> {
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>>
  create(obj: T, ctx?: any): Promise<number>;
  update(obj: T, ctx?: any): Promise<number>;
  patch(obj: Partial<T>, ctx?: any): Promise<number>;
}
// tslint:disable-next-line:max-classes-per-file
export class SearchWriter<T, F extends Filter> extends Writer<T> {
  constructor(protected repository: SearchWriterRepo<T, F>) {
    super(repository)
    this.search = this.search.bind(this);
  }
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(s, limit, page, fields);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class UseCase<T, ID, F extends Filter> extends SearchWriter<T, F> implements GenericSearchService<T, ID, number, F> {
  constructor(protected repository: GenericSearchRepository<T, ID, F>) {
    super(repository);
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
    this.delete = this.delete.bind(this);
  }
  metadata(): Attributes|undefined {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  }
  keys(): string[] {
    return (this.repository.keys ? this.repository.keys() : []);
  }
  load(id: ID, ctx?: any): Promise<T | null> {
    return this.repository.load(id, ctx);
  }
  delete(id: ID, ctx?: any): Promise<number> {
    return this.repository.delete(id, ctx);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class GenericUseCase<T, ID> extends Writer<T> implements GenericService<T, ID, number> {
  constructor(protected repository: GenericRepository<T, ID>) {
    super(repository);
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
    this.delete = this.delete.bind(this);
  }
  metadata(): Attributes|undefined {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  }
  keys(): string[] {
    return (this.repository.keys ? this.repository.keys() : []);
  }
  load(id: ID, ctx?: any): Promise<T | null> {
    return this.repository.load(id, ctx);
  }
  delete(id: ID, ctx?: any): Promise<number> {
    return this.repository.delete(id, ctx);
  }
}
export const CRUDUseCase = GenericUseCase
export const GenericManager = GenericUseCase
export const CRUDManager = GenericUseCase

export interface SavedRepository<UID, ID> {
  isSaved(userId: UID, id: ID): Promise<boolean>
  save(userId: UID, id: ID): Promise<number>
  remove(userId: UID, id: ID): Promise<number>
  count(userId: UID): Promise<number>
}

// tslint:disable-next-line:max-classes-per-file
export class SavedService<UID, ID> {
  constructor(protected savedRepository: SavedRepository<UID, ID>, protected max: number) {
    this.isSaved = this.isSaved.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  isSaved(userId: UID, id: ID): Promise<boolean> {
    return this.savedRepository.isSaved(userId, id)
  }
  save(userId: UID, id: ID): Promise<number> {
    return this.savedRepository.count(userId).then((count) => {
      if (count >= this.max) {
        return -1
      } else {
        return this.savedRepository.save(userId, id)
      }
    })
  }
  remove(userId: UID, id: ID): Promise<number> {
    return this.savedRepository.remove(userId, id)
  }
}
// tslint:disable-next-line:max-classes-per-file
export class SavedUseCase<ID, T> extends SavedService<ID, T> {
}
export function isSuccessful<T>(res: number | T | ErrorMessage[]): boolean {
  return (typeof res === "number" && res <= 0) || Array.isArray(res) ? false : true
}
