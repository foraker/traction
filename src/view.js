// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.View = (function(_super) {
    __extends(View, _super);

    function View(options) {
      this.children = new Traction.ViewCollection();
      this._initializeCallbacks();
      if (this.decorator) {
        options.model = this.buildDecorator(options.model);
      }
      View.__super__.constructor.apply(this, arguments);
      this.renderer = this.buildRenderer();
      this.invokeCallbacks("after:initialize");
    }

    View.prototype.buildRenderer = function() {
      if (this.template) {
        return new Traction.Rendering.TemplateStrategy({
          template: this.template,
          renderWithin: this.el
        });
      } else if (this.options.el) {
        return new Traction.Rendering.PrerenderedStrategy({
          renderWithin: this.el
        });
      } else {
        return new Traction.Rendering.AppendStrategy({
          renderWithin: this.el
        });
      }
    };

    View.prototype.buildDecorator = function(decorated) {
      var klass;
      if (_.isFunction(this.decorator)) {
        return new this.decorator(decorated);
      } else {
        klass = Traction.Decorator.extend(this.decorator);
        return new klass(decorated);
      }
    };

    View.prototype.proxyEvent = function(target, event, newEvent) {
      var callback;
      callback = (function(_this) {
        return function() {
          var args;
          args = Array.prototype.slice.call(arguments);
          args.unshift(newEvent || event);
          return _this.trigger.apply(_this, args);
        };
      })(this);
      return this.listenTo(target, event, callback);
    };

    View.prototype.render = function() {
      this.children.render();
      this.renderer.call({
        bindTo: this.model,
        children: this.children
      });
      this.invokeCallbacks("after:render");
      return this;
    };

    View.prototype.delegateEvents = function() {
      View.__super__.delegateEvents.apply(this, arguments);
      return this.children.each(function(child) {
        return child.delegateEvents();
      });
    };

    View.prototype.remove = function() {
      var _base;
      View.__super__.remove.apply(this, arguments);
      if (typeof (_base = this.renderer).destroy === "function") {
        _base.destroy();
      }
      return this.children.each(function(child) {
        return child.remove();
      });
    };

    View.prototype.invokeCallbacks = function(event) {
      var callback, _i, _len, _ref, _results;
      _ref = this._callbacks[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(this[callback]());
      }
      return _results;
    };

    View.prototype._initializeCallbacks = function() {
      var callbacks, event, _ref, _results;
      this._callbacks = {
        "after:initialize": [],
        "after:render": []
      };
      _ref = this.callbacks || {};
      _results = [];
      for (event in _ref) {
        callbacks = _ref[event];
        _results.push(this._callbacks[event] = callbacks.split(" "));
      }
      return _results;
    };

    return View;

  })(Backbone.View);

  Traction.View.mixin = function(object) {
    return _.extend(this.prototype, object);
  };

  Traction.View["extends"] = function(klass) {
    return this.mixin(klass.prototype);
  };

}).call(this);
