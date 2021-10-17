import {Filter} from '../model';
import {SearchResult} from '../model';

export interface SearchRepository<T, S extends Filter> {
  search(s: S, limit?: number, offset?: number|string, fields?: string[], ctx?: any): Promise<SearchResult<T>>;
}
