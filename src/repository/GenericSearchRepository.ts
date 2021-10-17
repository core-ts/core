import {Filter} from '../model';
import {GenericRepository} from './GenericRepository';
import {SearchRepository} from './SearchRepository';

export interface GenericSearchRepository<T, ID, R, S extends Filter>
  extends GenericRepository<T, ID, R>, SearchRepository<T, S> {
}
