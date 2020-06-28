import {ApprService} from './ApprService';
import {DiffService} from './DiffService';

export interface DiffApprService<T, ID> extends DiffService<T, ID>, ApprService<ID> {

}
