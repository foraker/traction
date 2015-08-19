// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Traction.Forms.Checkbox = (function(superClass) {
    extend(Checkbox, superClass);

    function Checkbox() {
      return Checkbox.__super__.constructor.apply(this, arguments);
    }

    Checkbox.prototype.inputTemplate = _.template("<input type=\"checkbox\" id=\"<%= options.id %>\" name=\"<%= options.name %>\">");

    Checkbox.prototype.events = {
      "change input": "applyAutoCommit"
    };

    Checkbox.prototype.get = function() {
      if (this._input().is(":checked")) {
        return this.options.checkedValue;
      } else {
        return this.options.uncheckedValue;
      }
    };

    Checkbox.prototype.set = function(val) {
      return this._input().prop("checked", this._checkedTest(val));
    };

    Checkbox.prototype.clear = function() {
      this.set(this.options.uncheckedValue);
      return this.clearErrors();
    };

    Checkbox.prototype._defaults = function() {
      return _.extend(Checkbox.__super__._defaults.apply(this, arguments), {
        checkedValue: true,
        uncheckedValue: null,
        checkedTest: function(val) {
          return val === this.options.checkedValue;
        }
      });
    };

    Checkbox.prototype._checkedTest = function(val) {
      return this.options.checkedTest.call(this, val);
    };

    return Checkbox;

  })(Traction.Forms.Field);

}).call(this);
