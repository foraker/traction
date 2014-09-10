// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Model = (function(_super) {
    __extends(Model, _super);

    _.extend(Model.prototype, Traction.ComputedAttributes);

    Model.prototype.associations = {};

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
      this._assignComputedAttributes();
    }

    Model.prototype.toggle = function(attribute) {
      return this.set(attribute, !this.get(attribute));
    };

    Model.prototype.set = function(key, value, options) {
      var newAttributes;
      if (typeof key === "object") {
        newAttributes = _.clone(key);
        options = value;
      } else {
        newAttributes = {};
        newAttributes[key] = value;
      }
      this._setAssociations(newAttributes, options || {});
      return Model.__super__.set.call(this, newAttributes, options);
    };

    Model.prototype.url = function() {
      return this.get("url") || Model.__super__.url.apply(this, arguments);
    };

    Model.prototype._setAssociations = function(attributes, options) {
      var associationName, isDirty, klass, newValue, previousValue, urlRoot, _ref, _results;
      _ref = this.associations;
      _results = [];
      for (associationName in _ref) {
        klass = _ref[associationName];
        newValue = attributes[associationName];
        if (previousValue = this.get(associationName)) {
          if (!(associationName in attributes)) {
            continue;
          }
          isDirty = this._updateAssociation(klass, associationName, newValue);
          if (isDirty && !options.silent) {
            this.trigger("change:" + associationName, previousValue);
          }
        } else {
          this._createAssociation(klass, associationName, newValue);
        }
        delete attributes[associationName];
        if (urlRoot = attributes["" + associationName + "_url"]) {
          _results.push(this.get(associationName).url = urlRoot);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Model.prototype._createAssociation = function(klass, name, newValue) {
      if (newValue instanceof klass) {
        return this.attributes[name] = newValue;
      } else {
        newValue = new klass(newValue);
        return this.attributes[name] = newValue;
      }
    };

    Model.prototype._updateAssociation = function(klass, name, newValue) {
      var dirtyCheck, isDirty;
      isDirty = false;
      dirtyCheck = (function(_this) {
        return function(cb) {
          var callback;
          callback = function() {
            return isDirty = true;
          };
          _this.get(name).on("change add remove", callback);
          cb();
          return _this.get(name).off("change add remove", callback);
        };
      })(this);
      if (newValue instanceof klass || !newValue) {
        if (this._isCollection(this.get(name)) && this._isCollection(newValue)) {
          dirtyCheck((function(_this) {
            return function() {
              return _this.attributes[name].set(newValue.models);
            };
          })(this));
        } else {
          isDirty = newValue !== this.get(name);
          this.attributes[name] = newValue;
        }
      } else {
        dirtyCheck((function(_this) {
          return function() {
            return _this.get(name).set(newValue);
          };
        })(this));
      }
      return isDirty;
    };

    Model.prototype._isCollection = function(collection) {
      return collection != null ? collection.models : void 0;
    };

    return Model;

  })(Backbone.Model);

}).call(this);
