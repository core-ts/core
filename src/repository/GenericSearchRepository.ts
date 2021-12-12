import {Filter} from '../model';
import {GenericRepository} from './GenericRepository';
import {SearchRepository} from './SearchRepository';

export interface GenericSearchRepository<T, ID, S extends Filter>
  extends GenericRepository<T, ID>, SearchRepository<T, S> {
}
