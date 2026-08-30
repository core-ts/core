export class SearchUseCase {
  constructor(repository) {
    this.repository = repository;
    this.search = this.search.bind(this);
  }
  search(s, limit, page, fields) {
    return this.repository.search(s, limit, page, fields);
  }
}
export const SearchManager = SearchUseCase;
export class Writer {
  constructor(repository) {
    this.repository = repository;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
  }
  create(obj) {
    return this.repository.create(obj);
  }
  update(obj) {
    return this.repository.update(obj);
  }
  patch(obj) {
    return (this.repository.patch ? this.repository.patch(obj) : Promise.resolve(-1));
  }
}
export class SearchWriter extends Writer {
  constructor(repository) {
    super(repository);
    this.repository = repository;
    this.search = this.search.bind(this);
  }
  search(filter, limit, page, fields) {
    return this.repository.search(filter, limit, page, fields);
  }
}
export class UseCase extends SearchWriter {
  constructor(repository) {
    super(repository);
    this.repository = repository;
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
    this.delete = this.delete.bind(this);
  }
  metadata() {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  }
  keys() {
    return (this.repository.keys ? this.repository.keys() : []);
  }
  load(id) {
    return this.repository.load(id);
  }
  delete(id) {
    return this.repository.delete(id);
  }
}
export class CRUDUseCase extends Writer {
  constructor(repository) {
    super(repository);
    this.repository = repository;
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
    this.delete = this.delete.bind(this);
  }
  metadata() {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  }
  keys() {
    return (this.repository.keys ? this.repository.keys() : []);
  }
  load(id) {
    return this.repository.load(id);
  }
  delete(id) {
    return this.repository.delete(id);
  }
}
export const GenericUseCase = CRUDUseCase;
export const GenericManager = CRUDUseCase;
export const CRUDManager = CRUDUseCase;
