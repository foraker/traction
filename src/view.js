// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Traction.View = (function(superClass) {
    extend(View, superClass);

    function View(options) {
      this._initializeCallbacks();
      this.invokeCallbacks("before:initialize");
      this.children = new Traction.ViewCollection();
      if (this.decorator) {
        options.model = this.buildDecorator(options.model);
      }
      View.__super__.constructor.apply(this, arguments);
      this.renderer = this.buildRenderer(options || {});
      this.invokeCallbacks("after:initialize");
    }

    View.prototype.setElement = function() {
      View.__super__.setElement.apply(this, arguments);
      return this.renderer = this.buildRenderer({
        el: this.el
      });
    };

    View.prototype.buildRenderer = function(options) {
      if (this.template) {
        return new Traction.Rendering.TemplateStrategy({
          template: this.template,
          renderWithin: this.el
        });
      } else if (options.el) {
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
      this.invokeCallbacks("before:render");
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
      var base;
      this.invokeCallbacks("before:remove");
      View.__super__.remove.apply(this, arguments);
      if (typeof (base = this.renderer).destroy === "function") {
        base.destroy();
      }
      this.children.each(function(child) {
        return child.remove();
      });
      return this.invokeCallbacks("after:remove");
    };

    View.prototype.invokeCallbacks = function(event) {
      var callback, i, len, ref, results;
      ref = this._callbacks[event];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        results.push(this[callback]());
      }
      return results;
    };

    View.prototype._initializeCallbacks = function() {
      var callbacks, event, ref, results;
      this._callbacks = {
        "before:initialize": [],
        "after:initialize": [],
        "before:render": [],
        "after:render": [],
        "before:remove": [],
        "after:remove": []
      };
      ref = this.callbacks || {};
      results = [];
      for (event in ref) {
        callbacks = ref[event];
        results.push(this._callbacks[event] = callbacks.split(" "));
      }
      return results;
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
