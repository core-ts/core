export const ObjectId = 'ObjectId';
export const date = 'date';
export const datetime = 'datetime';
export const time = 'time';
export const boolean = 'boolean';
export const number = 'number';
export const integer = 'integer';
export const text = 'text';
export const object = 'object';
export const array = 'array';
export const primitives = 'primitives';
export const binary = 'binary';
export const string = 'string';

export const currency = 'currency';
export const percentage = 'percentage';
export const email = 'email';
export const url = 'url';
export const phone = 'phone';
export const fax = 'fax';
export const ipv4 = 'ipv4';
export const ipv6 = 'ipv6';

export type DataType = 'ObjectId' | 'date' | 'datetime' | 'time'
    | 'boolean' | 'number' | 'integer' | 'string' | 'text'
    | 'object' | 'array' | 'primitives' | 'binary';
export type FormatType = 'currency' | 'percentage' | 'email' | 'url' | 'phone' | 'fax' | 'ipv4' | 'ipv6';

export enum Type {
  ObjectId = 'ObjectId',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  boolean = 'boolean',

  number = 'number',
  integer = 'integer',
  string = 'string',
  text = 'text',

  object = 'object',
  array = 'array',
  primitives =  'primitives',
  binary = 'binary'
}

export enum Format {
  currency = 'currency',
  percentage = 'percentage',

  email = 'email',
  url = 'url',
  phone = 'phone',
  fax = 'fax',

  ipv4 = 'ipv4',
  ipv6 = 'ipv6',
}

export interface Model {
  name?: string;
  attributes: Attributes;
  source?: string;
  model?: any;
  schema?: any;
}

export interface Attribute {
  name?: string;
  field?: string;
  type: DataType;
  format?: FormatType;
  required?: boolean;
  defaultValue?: any;
  key?: boolean;
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
export interface Attributes {
  [key: string]: Attribute;
}
