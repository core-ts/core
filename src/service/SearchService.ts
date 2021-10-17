import {Filter} from '../model';
import {SearchResult} from '../model';

export interface SearchService<T, S extends Filter> {
  keys?(): string[];
  search(s: S, limit?: number, offset?: number|string, fields?: string[], ctx?: any): Promise<SearchResult<T>>;
}
