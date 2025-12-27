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
