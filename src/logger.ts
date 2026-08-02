export interface NumberMap {
  [key: string]: number;
}
export interface SimpleMap {
  [key: string]: string | number | boolean | Date;
}
export interface LogMap {
  time: string;
  level: string;
  msg: string;
}
export interface LogMapConfig {
  time?: string;
  level?: string;
  msg?: string;
}
export interface Config {
  level?: string;
  map?: LogMapConfig;
  constants?: SimpleMap;
  name?: Name;
}
export type LogConf = Config;
export interface LogConfig {
  log: Config;
}
export interface Name {
  trace: string;
  debug: string;
  info: string;
  warn: string;
  error: string;
  panic: string;
  fatal: string;
}
export interface Logger {
  name: Name;
  level: number;
  map: LogMap;
  constants?: SimpleMap;
  trace(msg: string, m?: SimpleMap, ctx?: any): void;
  debug(msg: string, m?: SimpleMap, ctx?: any): void;
  info(msg: string, m?: SimpleMap, ctx?: any): void;
  warn(msg: string, m?: SimpleMap, ctx?: any): void;
  error(msg: string, m?: SimpleMap, ctx?: any): void;
  panic(msg: string, m?: SimpleMap, ctx?: any): void;
  fatal(msg: string, m?: SimpleMap, ctx?: any): void;
  isLevelEnabled(level: number): boolean;
  isTraceEnabled(): boolean;
  isDebugEnabled(): boolean;
  isInfoEnabled(): boolean;
  isWarnEnabled(): boolean;
  isErrorEnabled(): boolean;
  isPanicEnabled(): boolean;
  isFatalEnabled(): boolean;
}
