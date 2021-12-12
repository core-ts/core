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
var ViewManager = (function () {
  function ViewManager(repo) {
    this.repo = repo;
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.all = this.all.bind(this);
    this.load = this.load.bind(this);
    this.exist = this.exist.bind(this);
  }
  ViewManager.prototype.metadata = function () {
    return (this.repo.metadata ? this.repo.metadata() : undefined);
  };
  ViewManager.prototype.keys = function () {
    return (this.repo.keys ? this.repo.keys() : []);
  };
  ViewManager.prototype.all = function (ctx) {
    return (this.repo.all ? this.repo.all() : Promise.resolve([]));
  };
  ViewManager.prototype.load = function (id, ctx) {
    return this.repo.load(id, ctx);
    ;
  };
  ViewManager.prototype.exist = function (id, ctx) {
    return (this.repo.exist ? this.repo.exist(id, ctx) : Promise.resolve(false));
  };
  return ViewManager;
}());
exports.ViewManager = ViewManager;
var GenericManager = (function (_super) {
  __extends(GenericManager, _super);
  function GenericManager(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.insert = _this.insert.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.patch = _this.patch.bind(_this);
    _this.save = _this.save.bind(_this);
    _this.delete = _this.delete.bind(_this);
    return _this;
  }
  GenericManager.prototype.insert = function (obj, ctx) {
    return this.repository.insert(obj, ctx);
    ;
  };
  GenericManager.prototype.update = function (obj, ctx) {
    return this.repository.update(obj, ctx);
    ;
  };
  GenericManager.prototype.patch = function (obj, ctx) {
    return (this.repository.patch ? this.repository.patch(obj, ctx) : Promise.resolve(-1));
  };
  GenericManager.prototype.save = function (obj, ctx) {
    return (this.repository.save ? this.repository.save(obj, ctx) : Promise.resolve(-1));
  };
  GenericManager.prototype.delete = function (id, ctx) {
    return (this.repository.delete ? this.repository.delete(id, ctx) : Promise.resolve(-1));
  };
  return GenericManager;
}(ViewManager));
exports.GenericManager = GenericManager;
var Manager = (function (_super) {
  __extends(Manager, _super);
  function Manager(find, repo) {
    var _this = _super.call(this, repo) || this;
    _this.find = find;
    _this.search = _this.search.bind(_this);
    return _this;
  }
  Manager.prototype.search = function (s, limit, offset, fields) {
    return this.find(s, limit, offset, fields);
  };
  return Manager;
}(GenericManager));
exports.Manager = Manager;exports.DefaultViewService = ViewManager;exports.DefaultGenericService = GenericManager;exports.GenericSearchManager = Manager;exports.DefaultService = GenericManager;exports.DefaultGenericSearchService = GenericManager;
