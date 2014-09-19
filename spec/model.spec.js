// Generated by CoffeeScript 1.8.0
(function() {
  var TestClass,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TestClass = (function(_super) {
    __extends(TestClass, _super);

    function TestClass() {
      return TestClass.__super__.constructor.apply(this, arguments);
    }

    TestClass.prototype.computedAttributes = {
      fullName: function() {
        return [this.get("firstName"), this.get("lastName")].join(" ");
      }
    };

    return TestClass;

  })(Traction.Model);

  describe("Traction.Model", function() {
    describe("computed attributes", function() {
      beforeEach(function() {
        return this.model = new TestClass({
          firstName: "first",
          lastName: "last"
        });
      });
      it("should accurately compute the property", function() {
        return expect(this.model.get("fullName")).toBe("first last");
      });
      it("updates the when a dependency changes", function() {
        this.model.set({
          firstName: "updated first name"
        });
        return expect(this.model.get("fullName")).toBe("updated first name last");
      });
      return it("emits change events", function() {
        var spy;
        spy = jasmine.createSpy();
        this.model.on("change:fullName", spy);
        this.model.set({
          firstName: "updated first name"
        });
        return expect(spy).toHaveBeenCalled();
      });
    });
    describe("#url", function() {
      return it("returns the 'url' attribute", function() {
        var model;
        model = new Traction.Rails.Model({
          url: "/items"
        });
        return expect(model.url()).toBe("/items");
      });
    });
    describe("#toggle", function() {
      return it("inverts an attribute", function() {
        var model;
        model = new Traction.Rails.Model({
          admin: true
        });
        model.toggle('admin');
        return expect(model.get("admin")).toBe(false);
      });
    });
    return describe("#set", function() {
      var User;
      User = (function(_super) {
        __extends(User, _super);

        function User() {
          return User.__super__.constructor.apply(this, arguments);
        }

        User.prototype.associations = {
          comments: Backbone.Collection,
          profile: Backbone.Model
        };

        return User;

      })(Traction.Model);
      beforeEach(function() {
        return this.user = new User({
          name: "Test User",
          comments: [
            {
              content: "comment 1"
            }
          ],
          comments_url: "/comments"
        });
      });
      describe("creating associations", function() {
        it("assigns attributes", function() {
          return expect(this.user.get("name")).toBe("Test User");
        });
        it("maps the associated attribute to the correct class", function() {
          return expect(this.user.get("comments")).toBeInstanceOf(Backbone.Collection);
        });
        it("assigns the correct attributes to the association", function() {
          return expect(this.user.get("comments").first().get("content")).toBe("comment 1");
        });
        it("assign a URL when present", function() {
          return expect(this.user.get("comments").url).toBe("/comments");
        });
        return it("handles multiple associations", function() {
          var user;
          user = new User({
            profile: {}
          });
          return expect(user.get("profile")).toBeInstanceOf(Backbone.Model);
        });
      });
      describe("updating associations", function() {
        it("sets associated model attributes", function() {
          this.user.set({
            name: "new name"
          });
          return expect(this.user.get("name")).toBe("new name");
        });
        it("sets associated collection contents", function() {
          this.user.set({
            comments: []
          });
          return expect(this.user.get("comments").models).toEqual([]);
        });
        it("retains the updated association", function() {
          this.user.set({
            comments: []
          });
          return expect(this.user.get("comments")).toBeInstanceOf(Backbone.Collection);
        });
        it("does not remove associations when the attribute has not been specified", function() {
          var originalCollection;
          originalCollection = this.user.get("comments");
          this.user.set();
          return expect(this.user.get("comments")).toBe(originalCollection);
        });
        it("removes associations when the attribute is undefined", function() {
          this.user.set({
            comments: void 0
          });
          return expect(this.user.get("comments")).toBe(void 0);
        });
        it("sets setable (model) associations", function() {
          this.user.set({
            profile: {
              type: "admin"
            }
          });
          return expect(this.user.get("profile").get("type")).toBe("admin");
        });
        it("emits a change event", function() {
          var callback;
          callback = jasmine.createSpy();
          this.user.on("change:comments", callback);
          this.user.set({
            comments: []
          });
          return expect(callback).toHaveBeenCalled();
        });
        it("emits a change event when the association is removed", function() {
          var callback;
          callback = jasmine.createSpy();
          this.user.on("change:comments", callback);
          this.user.set({
            comments: null
          });
          return expect(callback).toHaveBeenCalled();
        });
        it("does not emit a change event when silent: true is passed", function() {
          var callback;
          callback = jasmine.createSpy();
          this.user.on("change:comments", callback);
          this.user.set({
            comments: []
          }, {
            silent: true
          });
          return expect(callback).not.toHaveBeenCalled();
        });
        it("does not emit a change event when the association is unchanged", function() {
          var callback;
          this.user.set({
            profile: {
              type: "admin"
            }
          });
          callback = jasmine.createSpy();
          this.user.on("change:profile", callback);
          this.user.set({
            profile: {
              type: "admin"
            }
          });
          return expect(callback).not.toHaveBeenCalled();
        });
        it("does not emit a change event when the lack of an association is unchanged", function() {
          var callback;
          this.user.set({
            profile: null
          });
          callback = jasmine.createSpy();
          this.user.on("change:profile", callback);
          this.user.set({
            profile: null
          });
          return expect(callback).not.toHaveBeenCalled();
        });
        return describe("updating a nested association", function() {
          var Fees, Leg, Legs, Move;
          Fees = (function(_super) {
            __extends(Fees, _super);

            function Fees() {
              return Fees.__super__.constructor.apply(this, arguments);
            }

            return Fees;

          })(Traction.Rails.Collection);
          Leg = (function(_super) {
            __extends(Leg, _super);

            function Leg() {
              return Leg.__super__.constructor.apply(this, arguments);
            }

            Leg.prototype.associations = {
              fees: Fees
            };

            return Leg;

          })(Traction.Rails.Model);
          Legs = (function(_super) {
            __extends(Legs, _super);

            function Legs() {
              return Legs.__super__.constructor.apply(this, arguments);
            }

            Legs.prototype.model = Leg;

            return Legs;

          })(Traction.Rails.Collection);
          Move = (function(_super) {
            __extends(Move, _super);

            function Move() {
              return Move.__super__.constructor.apply(this, arguments);
            }

            Move.prototype.associations = {
              legs: Legs
            };

            return Move;

          })(Traction.Rails.Model);
          beforeEach(function() {
            var fee, leg;
            fee = {
              id: 1
            };
            leg = {
              id: 1,
              fees: [fee]
            };
            return this.move = new Move({
              legs: [leg]
            });
          });
          it("retains nested references", function() {
            var fee, fees, leg;
            fees = this.move.get("legs").first().get("fees");
            fee = {
              id: 1
            };
            leg = {
              id: 1,
              fees: [fee]
            };
            this.move.set({
              legs: [leg]
            });
            return expect(this.move.get("legs").first().get("fees")).toBe(fees);
          });
          it("does not fire change events when the nested models are the same", function() {
            var callback, fee, leg;
            callback = jasmine.createSpy();
            leg = this.move.get("legs").first();
            leg.on("change:fees", callback);
            fee = {
              id: 1
            };
            leg = {
              id: 1,
              fees: [fee]
            };
            this.move.set({
              legs: [leg]
            });
            return expect(callback).not.toHaveBeenCalled();
          });
          it("retains references when values change", function() {
            var fee, fees, leg;
            fees = this.move.get("legs").first().get("fees");
            fee = {
              id: 2
            };
            leg = {
              id: 1,
              fees: [fee]
            };
            this.move.set({
              legs: [leg]
            });
            return expect(this.move.get("legs").first().get("fees")).toBe(fees);
          });
          return it("fires change events when the nested models are the same", function() {
            var callback, fee, leg;
            callback = jasmine.createSpy();
            leg = this.move.get("legs").first();
            leg.on("change:fees", callback);
            fee = {
              id: 2
            };
            leg = {
              id: 1,
              fees: [fee]
            };
            this.move.set({
              legs: [leg]
            });
            return expect(callback).toHaveBeenCalled();
          });
        });
      });
      it("handles attr, val style setting", function() {
        this.user.set("name", "Timothy");
        return expect(this.user.get("name")).toBe("Timothy");
      });
      return it("does not mutate the attributes", function() {
        var orignalAttributes;
        orignalAttributes = {
          comments: []
        };
        this.user.set(orignalAttributes);
        return expect(orignalAttributes).toEqual({
          comments: []
        });
      });
    });
  });

}).call(this);
