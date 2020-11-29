import {SearchModel} from '../model';
import {SearchResult} from '../model';

export interface SearchService<T, S extends SearchModel> {
  keys?(): string[];
  search(s: S, ctx?: any): Promise<SearchResult<T>>;
}
