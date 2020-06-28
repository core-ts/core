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

export interface MetaModel {
  model: Model;
  attributeName?: string;
  primaryKeys?: Attribute[];
  attributes: Attribute[];
  selectableAttributes?: Attribute[];
  insertableAttributes?: Attribute[];
  updatableAttributes?: Attribute[];
  patchableAttributes?: Attribute[];
  updatableMap?: Map<string, Attribute>;
  patchableMap?: Map<string, Attribute>;
  requiredFields?: string[];
  maxLengthAttributes?: Attribute[];
  minLengthAttributes?: Attribute[];
  maxAttributes?: Attribute[];
  minAttributes?: Attribute[];
  regExpAttributes?: Attribute[];
  boolFields?: string[];
  dateFields?: string[];
  integerFields?: string[];
  numberFields?: string[];
  percentageFields?: string[];
  currencyFields?: string[];
  emailFields?: string[];
  urlFields?: string[];
  phoneFields?: string[];
  faxFields?: string[];
  ipv4Fields?: string[];
  ipv6Fields?: string[];
  objectFields?: MetaModel[];
  arrayFields?: MetaModel[];
  map?: Map<string, string>;
  version?: string;
}

export interface MetaModelBuilder {
  build(model: Model): MetaModel;
}
