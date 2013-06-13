describe "form", ->
  beforeEach ->
    @model = {}
    @form  = new Traction.Forms.Form(model: @model)

  describe "#addInput", ->
    beforeEach ->
      @input = {}
      spyOn(Traction.Forms, "TextField").andReturn(@input)

    it "creates an input with default options", ->
      @form.addInput(attribute: "email")
      expect(Traction.Forms.TextField).toHaveBeenCalledWith({
        attribute: "email",
        label: "Email",
        model: @model
      })

    it "allows label specification", ->
      @form.addInput(attribute: "email", label: "User Email")
      expect(Traction.Forms.TextField).toHaveBeenCalledWith({
        attribute: "email",
        label: "User Email",
        model: @model
      })

    it "allows type specification", ->
      spyOn(Traction.Forms, "TextArea")
      @form.addInput(attribute: "email", type: Traction.Forms.TextArea)
      expect(Traction.Forms.TextArea).toHaveBeenCalledWith({
        attribute: "email",
        label: "Email",
        model: @model
      })

    it "adds the input to children", ->
      spyOn(@form.children, "add")
      @form.addInput(attribute: "email")
      expect(@form.children.add).toHaveBeenCalledWith('email_field', @input)

    it "allows the child name to be specified", ->
      spyOn(@form.children, "add")
      @form.addInput(attribute: "email", name: "emailInput")
      expect(@form.children.add).toHaveBeenCalledWith('emailInput', @input)

  describe "#serialize", ->
    it "serializes input values and attributes", ->
      child = {attribute: "attribute", val: -> "value"}
      @form.children.add(child)
      expect(@form.serialize()).toEqual {"attribute": "value"}

  describe "#renderErrors", ->
    it "serializes input values and attributes", ->
      child = {attribute: "attribute", val: -> "value"}
      @form.children.add(child)
      expect(@form.serialize()).toEqual {"attribute": "value"}

  describe "#clearErrors", ->
    it "clears errors for each child", ->
      child = jasmine.createSpyObj('input', ['clearErrors'])
      @form.children.add(child)
      @form.clearErrors()
      expect(child.clearErrors).toHaveBeenCalled()

    it "handles children which do not support clearning errors", ->
      @form.children.add({})
      @form.clearErrors()

  describe "#clear", ->
    it "clears each child", ->
      child = jasmine.createSpyObj('input', ['clear'])
      @form.children.add(child)
      @form.clear()
      expect(child.clear).toHaveBeenCalled()

    it "handles children which do not support clear", ->
      @form.children.add({})
      @form.clear()

  describe "#commit", ->
    it "commits each child", ->
      child = jasmine.createSpyObj('input', ['commit'])
      @form.children.add(child)
      @form.commit()
      expect(child.commit).toHaveBeenCalled()

    it "handles children which do not support commit", ->
      @form.children.add({})
      @form.commit()

  describe "#reset", ->
    it "reset each child", ->
      child = jasmine.createSpyObj('input', ['reset'])
      @form.children.add(child)
      @form.reset()
      expect(child.reset).toHaveBeenCalled()

    it "handles children which do not support resetting", ->
      @form.children.add({})
      @form.reset()
