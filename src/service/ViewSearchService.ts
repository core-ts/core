import {SearchModel} from '../model';
import {SearchService} from './SearchService';
import {ViewService} from './ViewService';

export interface ViewSearchService<T, ID, S extends SearchModel>
  extends ViewService<T, ID>, SearchService<T, S> {
}
