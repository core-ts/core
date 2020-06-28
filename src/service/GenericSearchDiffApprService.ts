import {SearchModel} from '../model';
import {DiffApprService} from './DiffApprService';
import {GenericSearchService} from './GenericSearchService';

export interface GenericSearchDiffApprService<T, ID, R, S extends SearchModel> extends GenericSearchService<T, ID, R, S>, DiffApprService<T, ID> {

}
