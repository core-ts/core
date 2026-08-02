interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
  message?: string;
}
export interface StringMap {
  [key: string]: string;
}
export interface Validator<T> {
  validate(model: T, resource?: StringMap, patch?: boolean): Promise<ErrorMessage[]>;
}

export interface SyncValidator<T> {
  validate(model: T, resource?: StringMap, patch?: boolean): ErrorMessage[];
}
