// Generated by CoffeeScript 1.3.3
(function() {

  window.Traction = {
    Rendering: {},
    Bindings: {},
    TemplateHelpers: {},
    Rails: {},
    Forms: {},
    config: {
      templatePath: "templates"
    }
  };

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var ComputedAttribute,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
      this.computedAttributes || (this.computedAttributes = {});
      this._assignComputedAttributes();
    }

    Model.prototype._assignComputedAttributes = function() {
      var attribute, computation, _ref, _results;
      _ref = this.computedAttributes;
      _results = [];
      for (attribute in _ref) {
        computation = _ref[attribute];
        _results.push(new ComputedAttribute(attribute, computation).bindTo(this));
      }
      return _results;
    };

    return Model;

  })(Backbone.Model);

  ComputedAttribute = (function() {

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

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.View = (function(_super) {

    __extends(View, _super);

    function View(options) {
      this.children = new Traction.ViewCollection();
      View.__super__.constructor.apply(this, arguments);
      this.renderer = this.buildRenderer();
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

    View.prototype.proxyEvent = function(target, event, newEvent) {
      var callback,
        _this = this;
      callback = function() {
        var args;
        args = Array.prototype.slice.call(arguments);
        args.unshift(newEvent || event);
        return _this.trigger.apply(_this, args);
      };
      return this.listenTo(target, event, callback);
    };

    View.prototype.render = function() {
      this.children.render();
      this.renderer.call({
        bindTo: this.model,
        children: this.children
      });
      return this;
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

    return View;

  })(Backbone.View);

  Traction.View.mixin = function(object) {
    return _.extend(this.prototype, object);
  };

  Traction.View["extends"] = function(klass) {
    return this.mixin(klass.prototype);
  };

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {

  Traction.ViewCollection = (function() {

    function ViewCollection() {
      this.collection = {};
    }

    ViewCollection.prototype.add = function(nameOrMember, member) {
      if (member) {
        return this.collection[nameOrMember] = member;
      } else {
        return this.collection[_.uniqueId()] = nameOrMember;
      }
    };

    ViewCollection.prototype.destroy = function() {
      this.each(function(child) {
        return child.remove();
      });
      return this.collection = {};
    };

    ViewCollection.prototype.get = function(name) {
      return this.collection[name];
    };

    ViewCollection.prototype.each = function(callback) {
      var member, name, _ref, _results;
      _ref = this.collection;
      _results = [];
      for (name in _ref) {
        member = _ref[name];
        _results.push(callback(member, name));
      }
      return _results;
    };

    ViewCollection.prototype.map = function(callback) {
      return _.map(this.collection, function(member, name) {
        return callback(member, name);
      });
    };

    ViewCollection.prototype.render = function() {
      this.each(function(member) {
        return member.render().delegateEvents();
      });
      return this;
    };

    ViewCollection.prototype.els = function() {
      return this.map(function(member) {
        return member.el;
      });
    };

    return ViewCollection;

  })();

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {

  Traction.TemplateHelpers.Formatting = {
    downcase: function(string) {
      return string.toLowerCase();
    },
    upcase: function(string) {
      return string.toUpperCase();
    },
    append: function(string, append) {
      return string + append;
    },
    nonBreaking: function(string) {
      return string || "&nbsp;";
    }
  };

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.NodeStrategy = (function(_super) {

    __extends(NodeStrategy, _super);

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
      var existingBinding, _i, _len, _ref,
        _this = this;
      _ref = this.bindings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        existingBinding = _ref[_i];
        existingBinding.destroy();
      }
      return this.$("[data-bind]").each(function(index, el) {
        var specification, _j, _len1, _ref1, _results;
        _ref1 = $(el).data("bind").split(" ");
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          specification = _ref1[_j];
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
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.AppendStrategy = (function(_super) {

    __extends(AppendStrategy, _super);

    function AppendStrategy() {
      return AppendStrategy.__super__.constructor.apply(this, arguments);
    }

    AppendStrategy.prototype.initialize = function() {
      return this.setElement(this.options.renderWithin);
    };

    AppendStrategy.prototype.call = function(options) {
      if (options == null) {
        options = {};
      }
      this.$el.empty();
      if (options.children != null) {
        return this.$el.append(options.children.els());
      }
    };

    return AppendStrategy;

  })(Backbone.View);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.PrerenderedStrategy = (function(_super) {

    __extends(PrerenderedStrategy, _super);

    function PrerenderedStrategy(options) {
      this.setElement(options.renderWithin);
      PrerenderedStrategy.__super__.constructor.apply(this, arguments);
    }

    PrerenderedStrategy.prototype.call = function(options) {
      if (options == null) {
        options = {};
      }
      this._applyBindings(options.bindTo);
      return this._outlet(options.children);
    };

    return PrerenderedStrategy;

  })(Traction.Rendering.NodeStrategy);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.TemplateStrategy = (function(_super) {

    __extends(TemplateStrategy, _super);

    function TemplateStrategy(options) {
      this.setElement(options.renderWithin);
      this.template = this.findTemplate(options.template);
      TemplateStrategy.__super__.constructor.apply(this, arguments);
    }

    TemplateStrategy.prototype.findTemplate = function(name) {
      var path;
      path = "" + Traction.config.templatePath + "/" + name;
      return JST[path] || (function() {
        throw "Missing template: " + path;
      })();
    };

    TemplateStrategy.prototype.call = function(options) {
      if (options == null) {
        options = {};
      }
      this.el.innerHTML = this._template({
        context: options.bindTo
      });
      this._applyBindings(options.bindTo);
      return this._outlet(options.children);
    };

    TemplateStrategy.prototype.buildOutlet = function(outletName) {
      outletName || (outletName = "");
      return "<script data-outlet='" + outletName + "'></script>";
    };

    TemplateStrategy.prototype._template = function(options) {
      return this.template(_.extend(options || {}, this._defaultTemplateOptions()));
    };

    TemplateStrategy.prototype._defaultTemplateOptions = function() {
      return {
        outlet: this.buildOutlet
      };
    };

    return TemplateStrategy;

  })(Traction.Rendering.NodeStrategy);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {

  Traction.Bindings.Binding = (function() {

    function Binding() {}

    Binding.prototype.bindTo = function(model) {
      this.model = model;
      this.model.on("change:" + this.property, this.update, this);
      this.update();
      return this;
    };

    Binding.prototype.destroy = function() {
      return this.model.off(null, null, this);
    };

    return Binding;

  })();

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Bindings.ContentBinding = (function(_super) {

    __extends(ContentBinding, _super);

    function ContentBinding(el, specification) {
      this.el = el;
      this.specification = specification;
      this.property = this.specification;
    }

    ContentBinding.prototype.update = function(options) {
      return this.el.innerHTML = this.model.get(this.property) || "";
    };

    return ContentBinding;

  })(Traction.Bindings.Binding);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Traction.Bindings.FormattedContentBinding = (function(_super) {

    __extends(FormattedContentBinding, _super);

    function FormattedContentBinding(el, specification) {
      var _ref,
        _this = this;
      this.el = el;
      this.specification = specification;
      _ref = this.specification.split("|"), this.property = _ref[0], this.formatters = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      this.formattingFunctions = _.map(this.formatters, function(formatter) {
        return _this._callFormattingFunction(formatter);
      });
    }

    FormattedContentBinding.prototype.update = function(options) {
      return this.el.innerHTML = _.reduce(this.formattingFunctions, (function(memo, formattingFunction) {
        return formattingFunction(memo);
      }), this.model.get(this.property));
    };

    FormattedContentBinding.prototype._callFormattingFunction = function(formatter) {
      var args, formattingFunction, _ref;
      _ref = formatter.split(":"), formatter = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      if (formattingFunction = Traction.TemplateHelpers.Formatting[formatter]) {
        return function(content) {
          return formattingFunction(content, args);
        };
      } else {
        throw "Can't find formatter: " + formatter;
      }
    };

    return FormattedContentBinding;

  })(Traction.Bindings.Binding);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Bindings.AttributeBinding = (function(_super) {

    __extends(AttributeBinding, _super);

    function AttributeBinding(el, specification) {
      var _ref;
      this.el = el;
      this.specification = specification;
      _ref = this.specification.split(":"), this.attribute = _ref[0], this.property = _ref[1], this.trueValue = _ref[2], this.falseValue = _ref[3];
    }

    AttributeBinding.prototype.update = function(options) {
      if (this._hasBooleanSpecification()) {
        return this._booleanUpdate();
      } else {
        return this._directUpdate();
      }
    };

    AttributeBinding.prototype._hasBooleanSpecification = function() {
      return this.trueValue != null;
    };

    AttributeBinding.prototype._booleanUpdate = function() {
      if (this._currentValue()) {
        this._addValueToAttribute(this.trueValue);
        if (this.falseValue) {
          return this._removeValueFromAttribute(this.falseValue);
        }
      } else {
        this._removeValueFromAttribute(this.trueValue);
        if (this.falseValue) {
          return this._addValueToAttribute(this.falseValue);
        }
      }
    };

    AttributeBinding.prototype._directUpdate = function() {
      this._removeValueFromAttribute(this.previousValue);
      this._addValueToAttribute(this._currentValue());
      return this.previousValue = this._currentValue();
    };

    AttributeBinding.prototype._addValueToAttribute = function(value) {
      return this._setAttribute(_.union(this._existingValues(), [value]));
    };

    AttributeBinding.prototype._removeValueFromAttribute = function(value) {
      return this._setAttribute(_.without(this._existingValues(), value));
    };

    AttributeBinding.prototype._existingValues = function() {
      return ($(this.el).attr(this.attribute) || "").split(" ");
    };

    AttributeBinding.prototype._setAttribute = function(values) {
      return $(this.el).attr(this.attribute, _.string.clean(values.join(" ")));
    };

    AttributeBinding.prototype._currentValue = function() {
      return this.model.get(this.property);
    };

    return AttributeBinding;

  })(Traction.Bindings.Binding);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {

  Traction.Bindings.Factory = function(el, specification) {
    if (specification.indexOf("|") > 0) {
      return new Traction.Bindings.FormattedContentBinding(el, specification);
    } else if (specification.indexOf(":") > 0) {
      return new Traction.Bindings.AttributeBinding(el, specification);
    } else {
      return new Traction.Bindings.ContentBinding(el, specification);
    }
  };

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rails.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.associations = {};

    Model.prototype.initialize = function() {
      if (!this._isBaseClass()) {
        this.paramRoot || (this.paramRoot = this._inferParamRoot());
      }
      return this.on("error", this.parseErrors, this);
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

    Model.prototype.parseErrors = function(self, response) {
      var _ref;
      return this.errors = (_ref = $.parseJSON(response.responseText)) != null ? _ref.errors : void 0;
    };

    Model.prototype.toggle = function(attribute) {
      return this.set(attribute, !this.get(attribute));
    };

    Model.prototype.url = function() {
      return this.get("url") || Model.__super__.url.apply(this, arguments);
    };

    Model.prototype.toJSON = function() {
      var attribute, json, _i, _len, _ref;
      if (this.persists) {
        json = {};
        _ref = this.persists;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attribute = _ref[_i];
          json[attribute] = this.get(attribute);
        }
        return json;
      } else {
        return Model.__super__.toJSON.apply(this, arguments);
      }
    };

    Model.prototype._inferParamRoot = function() {
      return _.string.underscored(this._className());
    };

    Model.prototype._className = function() {
      return this.constructor.toString().match(/function\s(.*?)\(/)[1].toString();
    };

    Model.prototype._isBaseClass = function() {
      return this.constructor === Traction.Rails.Model;
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
      var callback, isDirty;
      isDirty = false;
      if (newValue instanceof klass || !newValue) {
        isDirty = newValue !== this.get(name);
        this.attributes[name] = newValue;
      } else {
        callback = function() {
          return isDirty = true;
        };
        this.get(name).on("change add remove", callback);
        this.get(name).set(newValue);
        this.get(name).off("change add remove", callback);
      }
      return isDirty;
    };

    return Model;

  })(Backbone.Model);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rails.Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Traction.Rails.Model;

    Collection.prototype.build = function(attributes) {
      var model;
      if (attributes == null) {
        attributes = {};
      }
      model = new this.model(attributes);
      model.urlRoot = this.url;
      return model;
    };

    return Collection;

  })(Backbone.Collection);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Field = (function(_super) {

    __extends(Field, _super);

    function Field() {
      return Field.__super__.constructor.apply(this, arguments);
    }

    Field.prototype.labelTemplate = _.template("<label for=\"<%= options.id %>\">\n  <% if(options.required) { %><i>*</i><% } %> <%= options.label %>\n</label>");

    Field.prototype.className = "field";

    Field.prototype.initialize = function() {
      this.options = _.extend(this._defaults(), this.options);
      return this.listenTo(this.model, "change:" + this.options.attribute, this.reset);
    };

    Field.prototype.render = function() {
      this._empty();
      this._renderLabel();
      this._renderInput();
      if (this.options.required) {
        this._designateAsRequired();
      }
      this.reset();
      return this;
    };

    Field.prototype.renderErrors = function(messages) {
      return this.$el.addClass("error").append("<span class=\"inline-errors\">" + (messages.join(", ")) + "</span>");
    };

    Field.prototype.disable = function() {
      return this._input().attr("disabled", "disabled");
    };

    Field.prototype.enable = function() {
      return this._input().removeAttr("disabled");
    };

    Field.prototype.get = function() {
      return this._input().val();
    };

    Field.prototype.set = function(val) {
      return this._input().val(val);
    };

    Field.prototype.clear = function() {
      this.set("");
      return this.clearErrors();
    };

    Field.prototype.clearErrors = function() {
      this.$el.removeClass("error");
      return this.$(".inline-errors").remove();
    };

    Field.prototype.rerenderErrors = function(messages) {
      this.clearErrors();
      return this.renderErrors(messages);
    };

    Field.prototype.reset = function() {
      return this.set(this.model.get(this.options.attribute));
    };

    Field.prototype.commit = function() {
      return this.model.set(this.options.attribute, this.get());
    };

    Field.prototype.applyAutoCommit = function() {
      if (this.options.autoCommit) {
        return this.commit();
      }
    };

    Field.prototype._input = function() {
      return this.input || (this.input = this.$("input"));
    };

    Field.prototype._empty = function() {
      this.$el.empty();
      return this.input = null;
    };

    Field.prototype._renderLabel = function() {
      return this.$el.append(this.labelTemplate({
        options: this.options
      }));
    };

    Field.prototype._renderInput = function() {
      return this.$el.append(this.inputTemplate({
        options: this.options
      }));
    };

    Field.prototype._designateAsRequired = function() {
      return this.$el.addClass("required");
    };

    Field.prototype._defaults = function() {
      return {
        id: this.cid,
        placeholder: this.options.label,
        autoCommit: true,
        required: false
      };
    };

    return Field;

  })(Backbone.View);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.TextField = (function(_super) {

    __extends(TextField, _super);

    function TextField() {
      return TextField.__super__.constructor.apply(this, arguments);
    }

    TextField.prototype.inputTemplate = _.template("<input id=\"<%= options.id %>\" type=\"text\" name=\"<%= options.name %>\" placeholder=\"<%= options.placeholder %>\"/>");

    TextField.prototype.events = {
      "change input": "applyAutoCommit"
    };

    return TextField;

  })(Traction.Forms.Field);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.TextArea = (function(_super) {

    __extends(TextArea, _super);

    function TextArea() {
      return TextArea.__super__.constructor.apply(this, arguments);
    }

    TextArea.prototype.inputTemplate = _.template("<textarea id=\"<%= options.id %>\" name=\"<%= options.name %>\" placeholder=\"<%= options.placeholder %>\"/>");

    TextArea.prototype.events = {
      "change textarea": "applyAutoCommit"
    };

    TextArea.prototype._input = function() {
      return this.input || (this.input = this.$("textarea"));
    };

    return TextArea;

  })(Traction.Forms.Field);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Select = (function(_super) {

    __extends(Select, _super);

    function Select() {
      return Select.__super__.constructor.apply(this, arguments);
    }

    Select.prototype.inputTemplate = _.template("<select id=\"input-<%= options.id %>\" name=\"<%= options.name %>\">\n  <% if(options.includeBlank) { %><option value=\"\"><%= options.includeBlank %></option><% } %>\n  <% _.each(options.options, function(value, label){ %>\n    <option value=\"<%= value %>\"><%= label %></option>\n  <% }) %>\n</select>");

    Select.prototype.events = {
      "change select": "applyAutoCommit"
    };

    Select.prototype.clear = function() {
      this._input().val(this._firstOptionValue());
      return this.clearErrors();
    };

    Select.prototype.setOptions = function(options) {
      this.options.options = options;
      return this.render();
    };

    Select.prototype._firstOptionValue = function() {
      return this.$("option:first").attr("value");
    };

    Select.prototype._input = function() {
      return this.input || (this.input = this.$("select"));
    };

    Select.prototype._renderInput = function() {
      return this.$el.append(this.inputTemplate({
        options: this.options
      }));
    };

    return Select;

  })(Traction.Forms.Field);

}).call(this);
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Checkbox = (function(_super) {

    __extends(Checkbox, _super);

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
;// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Form = (function() {

    function Form() {}

    Form.prototype.addInput = function(options) {
      var klass, name;
      options = _.extend(this._defaults(options), options);
      (name = options.name) && delete options.name;
      (klass = options.type) && delete options.type;
      return this.children.add(name, new klass(options));
    };

    Form.prototype.addInputs = function(schema) {
      var attribute, options, _results;
      _results = [];
      for (attribute in schema) {
        options = schema[attribute];
        options.attribute = attribute;
        _results.push(this.addInput(options));
      }
      return _results;
    };

    Form.prototype.serialize = function() {
      var serialized;
      serialized = {};
      this.children.each(function(input) {
        return serialized[input.attribute] = input.val();
      });
      return serialized;
    };

    Form.prototype.renderErrors = function() {
      var _this = this;
      return this.children.each(function(child, attribute) {
        var errors, _ref;
        if (errors = (_ref = _this.model.errors) != null ? _ref[attribute] : void 0) {
          return child.rerenderErrors(errors);
        } else {
          return child.clearErrors();
        }
      });
    };

    Form.prototype.clearErrors = function() {
      return this.children.each(function(input) {
        return typeof input.clearErrors === "function" ? input.clearErrors() : void 0;
      });
    };

    Form.prototype.clear = function() {
      return this.children.each(function(input) {
        return typeof input.clear === "function" ? input.clear() : void 0;
      });
    };

    Form.prototype.commit = function() {
      return this.children.each(function(input) {
        return typeof input.commit === "function" ? input.commit() : void 0;
      });
    };

    Form.prototype.reset = function() {
      return this.children.each(function(input) {
        return typeof input.reset === "function" ? input.reset() : void 0;
      });
    };

    Form.prototype._defaults = function(options) {
      return {
        name: options.attribute,
        label: this._generateLabel(options.attribute),
        type: Traction.Forms.TextField,
        model: this.model
      };
    };

    Form.prototype._generateLabel = function(attribute) {
      return _.str.capitalize(_.str.humanize(attribute));
    };

    return Form;

  })();

  Traction.Forms.FormView = (function(_super) {

    __extends(FormView, _super);

    function FormView() {
      return FormView.__super__.constructor.apply(this, arguments);
    }

    FormView["extends"](Traction.Forms.Form);

    return FormView;

  })(Traction.View);

}).call(this);
