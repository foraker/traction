// Generated by CoffeeScript 1.9.3
(function() {
  Traction.ViewCollection = (function() {
    _.extend(ViewCollection.prototype, Backbone.Events);

    function ViewCollection() {
      this.collection = {};
    }

    ViewCollection.prototype.add = function(nameOrMember, member) {
      if (member) {
        this.collection[nameOrMember] = member;
      } else {
        member = nameOrMember;
        this.collection[_.uniqueId()] = member;
      }
      if (member.on && member.off) {
        return this.listenTo(member, "all", (function(_this) {
          return function() {
            var args;
            args = Array.prototype.slice.call(arguments);
            args = [args[0], member].concat(args.slice(1));
            return _this.trigger.apply(_this, args);
          };
        })(this));
      }
    };

    ViewCollection.prototype.broadcastOn = function(event, callback) {
      return this.listenTo(this, event, (function(_this) {
        return function(triggerer) {
          return _this.each(function(child) {
            if (child !== triggerer) {
              return callback(child);
            }
          });
        };
      })(this));
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
      var member, name, ref, results;
      ref = this.collection;
      results = [];
      for (name in ref) {
        member = ref[name];
        results.push(callback(member, name));
      }
      return results;
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

    ViewCollection.prototype.views = function() {
      return _.values(this.collection);
    };

    return ViewCollection;

  })();

}).call(this);
