// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.NodeStrategy = (function(_super) {

    __extends(NodeStrategy, _super);

    NodeStrategy.prototype.events = {
      "click :not(form)[data-emit]": "_emit",
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

    NodeStrategy.prototype._outlet = function(children) {
      var _this = this;
      return this.$("script[data-outlet]").each(function(index, el) {
        var name;
        if (name = $(el).data("outlet")) {
          return $(el).replaceWith(children.get(name).el);
        } else {
          return $(el).replaceWith(children.els());
        }
      });
    };

    NodeStrategy.prototype._applyBindings = function(binding) {
      var _this = this;
      return this.$("[data-bind]").each(function(index, el) {
        var specification, _i, _len, _ref, _results;
        _ref = $(el).data("bind").split(" ");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          specification = _ref[_i];
          _results.push(_this.bindings.push(Traction.Bindings.Factory(el, specification).bindTo(binding)));
        }
        return _results;
      });
    };

    NodeStrategy.prototype._emit = function(event) {
      var eventName, eventNames, _i, _len, _results;
      eventNames = event.currentTarget.getAttribute("data-emit").split(" ");
      _results = [];
      for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
        eventName = eventNames[_i];
        _results.push(this.$el.trigger(eventName));
      }
      return _results;
    };

    return NodeStrategy;

  })(Backbone.View);

}).call(this);
