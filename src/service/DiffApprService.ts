import {ApprService, ApprRepository} from './ApprService';
import {DiffService, DiffRepository} from './DiffService';

export interface DiffApprService<T, ID> extends DiffService<T, ID>, ApprService<ID> {

}
export interface DiffApprRepository<T, ID> extends DiffRepository<T, ID>, ApprRepository<ID> {

}
