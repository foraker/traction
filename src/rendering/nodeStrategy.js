// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Traction.Rendering.NodeStrategy = (function(superClass) {
    extend(NodeStrategy, superClass);

    NodeStrategy.prototype.events = {
      "click [data-emit]:not(form)": "_emit",
      "submit form[data-emit]": "_emit"
    };

    function NodeStrategy() {
      NodeStrategy.__super__.constructor.apply(this, arguments);
      this.bindings = [];
    }

    NodeStrategy.prototype.destroy = function() {
      return _.each(this.bindings, function(binding) {
        return binding.destroy();
      });
    };

    NodeStrategy.prototype.call = function(options) {
      if (options == null) {
        options = {};
      }
      if (options.bindTo) {
        this._applyBindings(options.bindTo);
      }
      if (options.children) {
        return this._outlet(options.children);
      }
    };

    NodeStrategy.prototype._outlet = function(children) {
      return this.$("script[data-outlet]").each((function(_this) {
        return function(index, el) {
          var name;
          if (name = $(el).data("outlet")) {
            return $(el).replaceWith(children.get(name).el);
          } else {
            return $(el).replaceWith(children.els());
          }
        };
      })(this));
    };

    NodeStrategy.prototype._applyBindings = function(binding) {
      var existingBinding, i, len, ref;
      ref = this.bindings;
      for (i = 0, len = ref.length; i < len; i++) {
        existingBinding = ref[i];
        existingBinding.destroy();
      }
      return this.$("[data-bind]").each((function(_this) {
        return function(index, el) {
          var j, len1, ref1, results, specification;
          ref1 = $(el).data("bind").split(" ");
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            specification = ref1[j];
            results.push(_this.bindings.push(Traction.Bindings.Factory(el, specification).bindTo(binding)));
          }
          return results;
        };
      })(this));
    };

    NodeStrategy.prototype._emit = function(event) {
      var eventName, eventNames, i, len, results;
      eventNames = event.currentTarget.getAttribute("data-emit").split(" ");
      results = [];
      for (i = 0, len = eventNames.length; i < len; i++) {
        eventName = eventNames[i];
        results.push(this.$el.trigger(eventName, event));
      }
      return results;
    };

    return NodeStrategy;

  })(Backbone.View);

}).call(this);
