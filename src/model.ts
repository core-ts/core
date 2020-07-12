export interface ValueText {
  value: string;
  text?: string;
}
export interface ValueCode {
  value: string;
  code?: string;
}
export interface ValueName {
  value: string;
  name?: string;
}
export interface CodeName {
  code: string;
  name?: string;
}
export interface CodeText {
  code: string;
  text?: string;
}

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}
export interface TimeRange {
  startTime?: Date;
  endTime?: Date;
}
export interface NumberRange {
  min?: number;
  max?: number;
  lower?: number;
  upper?: number;
}

export interface SearchModel {
  page: number;
  limit: number;
  firstLimit?: number;
  fields?: string[];
  sort?: string;
  currentUserId?: string;

  keyword?: string;
  excluding?: Map<string, any>;
  refId?: string|number;
}
export interface SearchResult<T> {
  total?: number;
  results: T[];
  last?: boolean;
}

export interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
  message?: string;
}
export enum StatusCode {
  DataNotFound = 0,
  Success = 1,
  Error = 2,
  DuplicateKeyError = 3,
  DataVersionError = 4,
  DataCorruptError = 5,
  ExternalError = 6
}
export interface ResultInfo<T> {
  status: StatusCode;
  errors?: ErrorMessage[];
  value?: T;
  message?: string;
}

export interface DiffModel<T, ID> {
  id?: ID;
  origin?: T;
  value: T;
}
export enum Status {
  DataNotFound = 0,
  Success = 1,
  Error = 2,
  DataVersionError = 4,
}
