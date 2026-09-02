import { ErrorMessage } from "./model"

export interface Parser<T, S> {
  parse: (data: S) => Promise<T>
}
export interface Transformer<T, S> {
  transform: (data: S) => Promise<T>
}

export interface CSVFieldParser<T> {
  name: string
  toString(data: T, key: string, v: string): void
}
export interface FixedLengthFieldParser<T> {
  name: string
  length: number
  parse(data: T, key: string, v: string): void
}

export interface Writer<T> {
  write: (obj: T) => Promise<number>
  flush?: () => Promise<number>
}
export interface ErrorHandler<T> {
  handleError(rs: T, errors: ErrorMessage[], i?: number, filename?: string): void
}
export interface ExceptionHandler<S> {
  handleException(res: S, err: any, i?: number, filename?: string): void
}

export interface FileWriter<T> {
  write(chunk: T): boolean
  end(cb?: () => void): void
}