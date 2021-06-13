import {SearchModel} from '../model';
import {SearchResult} from '../model';

export interface SearchRepository<T, S extends SearchModel> {
  search(s: S, limit?: number, skip?: number, ctx?: any): Promise<SearchResult<T>>;
}
