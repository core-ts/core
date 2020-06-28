import {SearchModel} from '../model';
import {GenericRepository} from './GenericRepository';
import {SearchRepository} from './SearchRepository';

export interface GenericSearchRepository<T, ID, R, S extends SearchModel>
  extends GenericRepository<T, ID, R>, SearchRepository<T, S> {
}
