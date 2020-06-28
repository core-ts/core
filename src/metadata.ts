export enum Type {
  ObjectId = 'ObjectId',
  Date = 'date',
  Boolean = 'boolean',

  Number = 'number',
  Integer = 'integer',
  String = 'string',

  Object = 'object',
  Array = 'array',
  Primitives =  'primitives',
  Binary = 'binary'
}

export enum Format {
  Currency = 'currency',
  Percentage = 'percentage',

  Email = 'email',
  Url = 'url',
  Phone = 'phone',
  Fax = 'fax',

  IPv4 = 'ipv4',
  IPv6 = 'ipv6',
}

export interface Model {
  name?: string;
  attributes: any;
  source?: string;
  model?: any;
  schema?: any;
}

export interface Attribute {
  name?: string;
  field?: string;
  type: Type;
  format?: Format;
  required?: boolean;
  defaultValue?: any;
  primaryKey?: boolean;
  unique?: boolean;
  noinsert?: boolean;
  noupdate?: boolean;
  nopatch?: boolean;
  version?: boolean;
  length?: number;
  min?: number;
  max?: number;
  gt?: number;
  lt?: number;
  precision?: number;
  scale?: number;
  exp?: RegExp|string;
  code?: string;
  noformat?: boolean;
  ignored?: boolean;
  jsonField?: string;
  link?: string;
  typeof?: Model;
}
