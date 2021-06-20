import {SearchModel} from '../model';
import {SearchResult} from '../model';

export interface SearchService<T, S extends SearchModel> {
  keys?(): string[];
  search(s: S, limit?: number, skip?: number, ctx?: any): Promise<SearchResult<T>|T[]>;
}
