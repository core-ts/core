import {SearchModel} from '../model';
import {SearchResult} from '../model';

export interface SearchRepository<T, S extends SearchModel> {
  search(s: S, ctx?: any): Promise<SearchResult<T>>;
}
