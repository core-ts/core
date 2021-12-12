import {Filter} from '../model';
import {GenericService} from './GenericService';
import {SearchService} from './SearchService';

export interface GenericSearchService<T, ID, R, F extends Filter>
  extends GenericService<T, ID, R>, SearchService<T, F> {
}
