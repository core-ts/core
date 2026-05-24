export * from './db';

export * from './formatter';
export * from './metadata';
export * from './cache';
export * from './validator';
export * from './loader';
export * from './model';

import { GenericRepository, SearchRepository, GenericSearchRepository, Transaction } from './db';
import { GenericSearchService, GenericService } from './service';
export * from './service';

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
import { Filter, SearchResult } from './model';

export type Search<T, F> = (s: F, limit: number, page?: number | string, fields?: string[]) => Promise<SearchResult<T>>;
export type SearchFunc<T, F> = Search<T, F>;

export interface Notification {
  id?: string
  sender: string
  receiver: string
  url?: string
  message: string
}
export interface NotificationPort {
  push(notification: Notification): Promise<number>
  pushNotifications(notifications: Notification[]): Promise<number>
}
export interface NotificationRepository {
  push(notification: Notification): Promise<number>
  pushNotifications(notifications: Notification[]): Promise<number>
}

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
  create(obj: T, ctx?: Transaction): Promise<number>;
  update(obj: T, ctx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, ctx?: Transaction): Promise<number>;
}
// tslint:disable-next-line:max-classes-per-file
export class Writer<T> {
  constructor(protected repository: WriterRepo<T>) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
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
}

interface SearchWriterRepo<T, F extends Filter> {
  search(s: F, limit: number, page?: number|string, fields?: string[]): Promise<SearchResult<T>>
  create(obj: T, ctx?: Transaction): Promise<number>;
  update(obj: T, ctx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, ctx?: Transaction): Promise<number>;
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
  load(id: ID): Promise<T | null> {
    return this.repository.load(id);
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id);
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
  metadata(): Attributes | undefined {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  }
  keys(): string[] {
    return (this.repository.keys ? this.repository.keys() : []);
  }
  load(id: ID): Promise<T | null> {
    return this.repository.load(id);
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id);
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
export interface FollowRepository<ID> {
  follow(id: ID, target: ID): Promise<number>
  unfollow(id: ID, target: ID): Promise<number>
}
