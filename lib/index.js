"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager = (function () {
  function ViewManager(r) {
    this.r = r;
    this.metadata = this.metadata.bind(this);
    this.keys = this.keys.bind(this);
    this.load = this.load.bind(this);
  }
  ViewManager.prototype.metadata = function () {
    return this.r.metadata ? this.r.metadata() : undefined;
  };
  ViewManager.prototype.keys = function () {
    return this.r.keys ? this.r.keys() : [];
  };
  ViewManager.prototype.load = function (id, ctx) {
    return this.r.load(id, ctx);
  };
  return ViewManager;
})();
exports.ViewManager = ViewManager;
var ViewUseCase = (function (_super) {
  __extends(ViewUseCase, _super);
  function ViewUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return ViewUseCase;
})(ViewManager);
exports.ViewUseCase = ViewUseCase;
var DefaultViewService = (function (_super) {
  __extends(DefaultViewService, _super);
  function DefaultViewService() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return DefaultViewService;
})(ViewManager);
exports.DefaultViewService = DefaultViewService;
var ViewSearchManager = (function (_super) {
  __extends(ViewSearchManager, _super);
  function ViewSearchManager(find, repo) {
    var _this = _super.call(this, repo) || this;
    _this.find = find;
    _this.search = _this.search.bind(_this);
    return _this;
  }
  ViewSearchManager.prototype.search = function (s, limit, offset, fields) {
    return this.find(s, limit, offset, fields);
  };
  return ViewSearchManager;
})(ViewManager);
exports.ViewSearchManager = ViewSearchManager;
var ViewSearchUseCase = (function (_super) {
  __extends(ViewSearchUseCase, _super);
  function ViewSearchUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return ViewSearchUseCase;
})(ViewSearchManager);
exports.ViewSearchUseCase = ViewSearchUseCase;
var SearchManager = (function (_super) {
  __extends(SearchManager, _super);
  function SearchManager(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.search = _this.search.bind(_this);
    return _this;
  }
  SearchManager.prototype.search = function (s, limit, offset, fields) {
    return this.repository.search(s, limit, offset, fields);
  };
  return SearchManager;
})(ViewManager);
exports.SearchManager = SearchManager;
var SearchUseCase = (function (_super) {
  __extends(SearchUseCase, _super);
  function SearchUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return SearchUseCase;
})(SearchManager);
exports.SearchUseCase = SearchUseCase;
var GenericManager = (function (_super) {
  __extends(GenericManager, _super);
  function GenericManager(repository) {
    var _this = _super.call(this, repository) || this;
    _this.repository = repository;
    _this.create = _this.create.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.patch = _this.patch.bind(_this);
    _this.delete = _this.delete.bind(_this);
    return _this;
  }
  GenericManager.prototype.create = function (obj, ctx) {
    return this.repository.create(obj, ctx);
  };
  GenericManager.prototype.update = function (obj, ctx) {
    return this.repository.update(obj, ctx);
  };
  GenericManager.prototype.patch = function (obj, ctx) {
    return this.repository.patch
      ? this.repository.patch(obj, ctx)
      : Promise.resolve(-1);
  };
  GenericManager.prototype.delete = function (id, ctx) {
    return this.repository.delete
      ? this.repository.delete(id, ctx)
      : Promise.resolve(-1);
  };
  return GenericManager;
})(ViewManager);
exports.GenericManager = GenericManager;
var GenericUseCase = (function (_super) {
  __extends(GenericUseCase, _super);
  function GenericUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return GenericUseCase;
})(GenericManager);
exports.GenericUseCase = GenericUseCase;
var DefaultGenericService = (function (_super) {
  __extends(DefaultGenericService, _super);
  function DefaultGenericService() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return DefaultGenericService;
})(GenericManager);
exports.DefaultGenericService = DefaultGenericService;
var DefaultService = (function (_super) {
  __extends(DefaultService, _super);
  function DefaultService() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return DefaultService;
})(GenericManager);
exports.DefaultService = DefaultService;
var DefaultGenericSearchService = (function (_super) {
  __extends(DefaultGenericSearchService, _super);
  function DefaultGenericSearchService() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return DefaultGenericSearchService;
})(GenericManager);
exports.DefaultGenericSearchService = DefaultGenericSearchService;
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
})(GenericManager);
exports.Manager = Manager;
var UseCase = (function (_super) {
  __extends(UseCase, _super);
  function UseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return UseCase;
})(Manager);
exports.UseCase = UseCase;
var GenericSearchManager = (function (_super) {
  __extends(GenericSearchManager, _super);
  function GenericSearchManager() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return GenericSearchManager;
})(Manager);
exports.GenericSearchManager = GenericSearchManager;
var GenericSearchUseCase = (function (_super) {
  __extends(GenericSearchUseCase, _super);
  function GenericSearchUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return GenericSearchUseCase;
})(Manager);
exports.GenericSearchUseCase = GenericSearchUseCase;
var SavedService = (function () {
  function SavedService(repository, query, max, autoRemove) {
    this.repository = repository;
    this.query = query;
    this.max = max;
    this.autoRemove = autoRemove;
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  SavedService.prototype.load = function (id) {
    var _this = this;
    return this.repository.load(id).then(function (items) {
      if (!items || items.length === 0) {
        return [];
      }
      return _this.query(items);
    });
  };
  SavedService.prototype.save = function (id, itemId) {
    var _this = this;
    return this.repository.load(id).then(function (items) {
      if (items == null) {
        return _this.repository.create(id, [itemId]);
      } else {
        if (items.includes(itemId)) {
          return Promise.resolve(0);
        } else {
          items.push(itemId);
          if (items.length > _this.max) {
            if (_this.autoRemove) {
              items.shift();
              return _this.repository.update(id, items);
            } else {
              return Promise.resolve(-1);
            }
          } else {
            return _this.repository.update(id, items);
          }
        }
      }
    });
  };
  SavedService.prototype.remove = function (id, itemId) {
    var _this = this;
    return this.repository.load(id).then(function (items) {
      if (items == null) {
        return Promise.resolve(0);
      } else {
        if (items.includes(itemId)) {
          items = items.filter(function (item) {
            return item !== itemId;
          });
          return _this.repository.update(id, items);
        } else {
          return Promise.resolve(0);
        }
      }
    });
  };
  return SavedService;
})();
exports.SavedService = SavedService;
var SavedManager = (function (_super) {
  __extends(SavedManager, _super);
  function SavedManager() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return SavedManager;
})(SavedService);
exports.SavedManager = SavedManager;
var SavedUseCase = (function (_super) {
  __extends(SavedUseCase, _super);
  function SavedUseCase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return SavedUseCase;
})(SavedService);
exports.SavedUseCase = SavedUseCase;
