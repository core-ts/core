"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewUseCase = (function () {
  function ViewUseCase(r) {
    this.r = r;
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
  }
  ViewUseCase.prototype.metadata = function () {
    return (this.r.metadata ? this.r.metadata() : undefined);
  };
  ViewUseCase.prototype.keys = function () {
    return (this.r.keys ? this.r.keys() : []);
  };
  ViewUseCase.prototype.load = function (id, ctx) {
    return this.r.load(id, ctx);
  };
  return ViewUseCase;
}());
exports.ViewUseCase = ViewUseCase;
var ViewManager = (function (_super) {
  __extends(ViewManager, _super);
  function ViewManager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return ViewManager;
}(ViewUseCase));
exports.ViewManager = ViewManager;
var SearchUseCase = (function () {
  function SearchUseCase(repo) {
    this.repo = repo;
    this.search = this.search.bind(this);
  }
  SearchUseCase.prototype.search = function (s, limit, page, fields) {
    return this.repo.search(s, limit, page, fields);
  };
  return SearchUseCase;
}());
exports.SearchUseCase = SearchUseCase;
exports.SearchManager = SearchUseCase;
var ViewSearchUseCase = (function (_super) {
  __extends(ViewSearchUseCase, _super);
  function ViewSearchUseCase(repo) {
    var _this = _super.call(this, repo) || this;
    _this.repo = repo;
    _this.search = _this.search.bind(_this);
    return _this;
  }
  ViewSearchUseCase.prototype.search = function (s, limit, page, fields) {
    return this.repo.search(s, limit, page, fields);
  };
  return ViewSearchUseCase;
}(ViewUseCase));
exports.ViewSearchUseCase = ViewSearchUseCase;
var ViewSearchManger = (function (_super) {
  __extends(ViewSearchManger, _super);
  function ViewSearchManger() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return ViewSearchManger;
}(ViewSearchUseCase));
exports.ViewSearchManger = ViewSearchManger;
var GenericUseCase = (function (_super) {
  __extends(GenericUseCase, _super);
  function GenericUseCase(repo) {
    var _this = _super.call(this, repo) || this;
    _this.repo = repo;
    _this.create = _this.create.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.patch = _this.patch.bind(_this);
    _this.delete = _this.delete.bind(_this);
    return _this;
  }
  GenericUseCase.prototype.create = function (obj, ctx) {
    return this.repo.create(obj, ctx);
  };
  GenericUseCase.prototype.update = function (obj, ctx) {
    return this.repo.update(obj, ctx);
  };
  GenericUseCase.prototype.patch = function (obj, ctx) {
    return (this.repo.patch ? this.repo.patch(obj, ctx) : Promise.resolve(-1));
  };
  GenericUseCase.prototype.delete = function (id, ctx) {
    return (this.repo.delete ? this.repo.delete(id, ctx) : Promise.resolve(-1));
  };
  return GenericUseCase;
}(ViewUseCase));
exports.GenericUseCase = GenericUseCase;
exports.GenericManager = GenericUseCase;
var UseCase = (function (_super) {
  __extends(UseCase, _super);
  function UseCase(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    return _this;
  }
  UseCase.prototype.search = function (s, limit, page, fields) {
    return this.repository.search(s, limit, page, fields);
  };
  return UseCase;
}(GenericUseCase));
exports.UseCase = UseCase;
var Manager = (function (_super) {
  __extends(Manager, _super);
  function Manager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return Manager;
}(UseCase));
exports.Manager = Manager;
var SavedService = (function () {
  function SavedService(savedRepository, max) {
    this.savedRepository = savedRepository;
    this.max = max;
    this.isSaved = this.isSaved.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  SavedService.prototype.isSaved = function (userId, id) {
    return this.savedRepository.isSaved(userId, id);
  };
  SavedService.prototype.save = function (userId, id) {
    var _this = this;
    return this.savedRepository.count(userId).then(function (count) {
      if (count >= _this.max) {
        return -1;
      }
      else {
        return _this.savedRepository.save(userId, id);
      }
    });
  };
  SavedService.prototype.remove = function (userId, id) {
    return this.savedRepository.remove(userId, id);
  };
  return SavedService;
}());
exports.SavedService = SavedService;
var SavedManager = (function (_super) {
  __extends(SavedManager, _super);
  function SavedManager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return SavedManager;
}(SavedService));
exports.SavedManager = SavedManager;
var SavedUseCase = (function (_super) {
  __extends(SavedUseCase, _super);
  function SavedUseCase() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return SavedUseCase;
}(SavedService));
exports.SavedUseCase = SavedUseCase;
