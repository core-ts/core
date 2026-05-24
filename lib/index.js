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
  Writer.prototype.create = function (obj) {
    return this.repository.create(obj);
  };
  Writer.prototype.update = function (obj) {
    return this.repository.update(obj);
  };
  Writer.prototype.patch = function (obj) {
    return (this.repository.patch ? this.repository.patch(obj) : Promise.resolve(-1));
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
  UseCase.prototype.load = function (id) {
    return this.repository.load(id);
  };
  UseCase.prototype.delete = function (id) {
    return this.repository.delete(id);
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
  GenericUseCase.prototype.load = function (id) {
    return this.repository.load(id);
  };
  GenericUseCase.prototype.delete = function (id) {
    return this.repository.delete(id);
  };
  return GenericUseCase;
}(Writer));
exports.GenericUseCase = GenericUseCase;
exports.CRUDUseCase = GenericUseCase;
exports.GenericManager = GenericUseCase;
exports.CRUDManager = GenericUseCase;
