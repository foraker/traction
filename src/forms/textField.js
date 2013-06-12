// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.TextField = (function(_super) {

    __extends(TextField, _super);

    function TextField() {
      return TextField.__super__.constructor.apply(this, arguments);
    }

    TextField.prototype.labelTemplate = _.template("<label for=\"<%= options.id %>\">\n  <% if(options.required) { %><i>*</i><% } %> <%= options.label %>\n</label>");

    TextField.prototype.inputTemplate = _.template("<input id=\"<%= options.id %>\" type=\"text\" name=\"<%= options.name %>\" placeholder=\"<%= options.placeholder %>\"/>");

    TextField.prototype.events = {
      "change input": "applyAutoCommit"
    };

    return TextField;

  })(Traction.Forms.Field);

}).call(this);
