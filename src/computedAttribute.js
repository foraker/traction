// Generated by CoffeeScript 1.8.0
(function() {
  Traction.ComputedAttribute = (function() {
    function ComputedAttribute(attribute, computation) {
      this.attribute = attribute;
      this.computation = computation;
    }

    ComputedAttribute.prototype.bindTo = function(model) {
      var dependency, _i, _len, _ref;
      this.model = model;
      _ref = this._dependencies();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dependency = _ref[_i];
        this.model.on("change:" + dependency, this._assign, this);
      }
      return this._assign();
    };

    ComputedAttribute.prototype._dependencies = function() {
      return _.map(this._getterCalls(), function(match) {
        return match.replace(/this\.get\("/, "").replace(/\W/g, "");
      });
    };

    ComputedAttribute.prototype._getterCalls = function() {
      return this.computation.toString().match(/this\.get\(.*?\)/g);
    };

    ComputedAttribute.prototype._assign = function() {
      return this.model.set(this.attribute, this.computation.apply(this.model));
    };

    return ComputedAttribute;

  })();

  Traction.ComputedAttributes = {
    _assignComputedAttributes: function() {
      var attribute, computation, _ref, _results;
      this.computedAttributes || (this.computedAttributes = {});
      _ref = this.computedAttributes;
      _results = [];
      for (attribute in _ref) {
        computation = _ref[attribute];
        _results.push(new Traction.ComputedAttribute(attribute, computation).bindTo(this));
      }
      return _results;
    }
  };

}).call(this);
