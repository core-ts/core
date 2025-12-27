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
var SearchUseCase = (function () {
  function SearchUseCase(repository) {
    this.repository = repository;
    this.search = this.search.bind(this);
  }
  SearchUseCase.prototype.search = function (s, limit, page, fields) {
    return this.repository.search(s, limit, page, fields);
  };
  return SearchUseCase;
}());
exports.SearchUseCase = SearchUseCase;
exports.SearchManager = SearchUseCase;
var Writer = (function () {
  function Writer(repository) {
    this.repository = repository;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
  }
  Writer.prototype.create = function (obj, ctx) {
    return this.repository.create(obj, ctx);
  };
  Writer.prototype.update = function (obj, ctx) {
    return this.repository.update(obj, ctx);
  };
  Writer.prototype.patch = function (obj, ctx) {
    return (this.repository.patch ? this.repository.patch(obj, ctx) : Promise.resolve(-1));
  };
  return Writer;
}());
exports.Writer = Writer;
var SearchWriter = (function (_super) {
  __extends(SearchWriter, _super);
  function SearchWriter(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.search = _this.search.bind(_this);
    return _this;
  }
  SearchWriter.prototype.search = function (s, limit, page, fields) {
    return this.repository.search(s, limit, page, fields);
  };
  return SearchWriter;
}(Writer));
exports.SearchWriter = SearchWriter;
var UseCase = (function (_super) {
  __extends(UseCase, _super);
  function UseCase(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.metadata = _this.metadata.bind(_this);
    _this.keys = _this.keys.bind(_this);
    _this.load = _this.load.bind(_this);
    _this.delete = _this.delete.bind(_this);
    return _this;
  }
  UseCase.prototype.metadata = function () {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  };
  UseCase.prototype.keys = function () {
    return (this.repository.keys ? this.repository.keys() : []);
  };
  UseCase.prototype.load = function (id, ctx) {
    return this.repository.load(id, ctx);
  };
  UseCase.prototype.delete = function (id, ctx) {
    return this.repository.delete(id, ctx);
  };
  return UseCase;
}(SearchWriter));
exports.UseCase = UseCase;
var GenericUseCase = (function (_super) {
  __extends(GenericUseCase, _super);
  function GenericUseCase(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.metadata = _this.metadata.bind(_this);
    _this.keys = _this.keys.bind(_this);
    _this.load = _this.load.bind(_this);
    _this.delete = _this.delete.bind(_this);
    return _this;
  }
  GenericUseCase.prototype.metadata = function () {
    return (this.repository.metadata ? this.repository.metadata() : undefined);
  };
  GenericUseCase.prototype.keys = function () {
    return (this.repository.keys ? this.repository.keys() : []);
  };
  GenericUseCase.prototype.load = function (id, ctx) {
    return this.repository.load(id, ctx);
  };
  GenericUseCase.prototype.delete = function (id, ctx) {
    return this.repository.delete(id, ctx);
  };
  return GenericUseCase;
}(Writer));
exports.GenericUseCase = GenericUseCase;
exports.CRUDUseCase = GenericUseCase;
exports.GenericManager = GenericUseCase;
exports.CRUDManager = GenericUseCase;
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
var SavedUseCase = (function (_super) {
  __extends(SavedUseCase, _super);
  function SavedUseCase() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return SavedUseCase;
}(SavedService));
exports.SavedUseCase = SavedUseCase;
