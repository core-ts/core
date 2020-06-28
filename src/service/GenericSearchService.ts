import {SearchModel} from '../model';
import {GenericService} from './GenericService';
import {SearchService} from './SearchService';

export interface GenericSearchService<T, ID, R, S extends SearchModel>
  extends GenericService<T, ID, R>, SearchService<T, S> {
}
