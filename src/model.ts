export interface Headers {
  [key: string]: any;
}
export interface HttpOptionsService {
  getHttpOptions(): { headers?: Headers };
}
export interface HttpRequest {
  get<T>(url: string, options?: {headers?: Headers}): Promise<T>;
  delete<T>(url: string, options?: {headers?: Headers}): Promise<T>;
  post<T>(url: string, obj: any, options?: {headers?: Headers}): Promise<T>;
  put<T>(url: string, obj: any, options?: {headers?: Headers}): Promise<T>;
  patch<T>(url: string, obj: any, options?: {headers?: Headers}): Promise<T>;
}
export interface Module {
  id?: string|number;
  path?: string;
  route?: string;
}
export interface ModuleLoader {
  load(): Promise<Module[]>;
}
export interface Tracking {
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface Version {
  version?: number;
}
export interface Sequence {
  sequenceNo: number;
}
export interface Domain {
  id: string;
  name?: string;
  status?: string;
}
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
  page?: number;
  limit?: number;
  firstLimit?: number;
  fields?: string[];
  sort?: string;
  currentUserId?: string;

  q?: string;
  keyword?: string;
  excluding?: string[]|number[];
  refId?: string|number;

  pageIndex?: number;
  pageSize?: number;
}
export interface SearchResult<T> {
  list: T[];
  total?: number;
  last?: boolean;
  nextPageToken?: string;
}

export interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
  message?: string;
}
export interface ResultInfo<T> {
  status: number|string;
  errors?: ErrorMessage[];
  value?: T;
  message?: string;
}

export interface DiffModel<T, ID> {
  id?: ID;
  origin?: T;
  value: T;
}

export interface UserSM extends SearchModel {
  userId?: string;
  username?: string;
  email?: string;
  displayName?: string;
  status?: string[]|string;
}
export interface RoleSM extends SearchModel {
  roleId?: string;
  roleName?: string;
  status?: string[]|string;
  remark?: string;
  description?: string;
}
