describe "binding factory", ->
  describe "when a colon is present in the specification", ->
    attributeBinding = {}
    element = {}

    beforeEach ->
      spyOn(Traction.Bindings, "AttributeBinding").andReturn(attributeBinding)

    it "instantiates an attribute binding", ->
      Traction.Bindings.Factory(element, "attribute:value")
      expect(Traction.Bindings.AttributeBinding).toHaveBeenCalledWith element, "attribute:value"

    it "returns the attribute binding", ->
      expect(Traction.Bindings.Factory(element, "attribute:value")).toBe attributeBinding

  describe "when a pipe is present in the specification", ->
    formatBinding = {}
    element = {}

    beforeEach ->
      spyOn(Traction.Bindings, "FormattedContentBinding").andReturn(formatBinding)

    it "instantiates an formatted content binding", ->
      Traction.Bindings.Factory(element, "attribute|formatter")
      expect(Traction.Bindings.FormattedContentBinding).toHaveBeenCalledWith element, "attribute|formatter"

    it "returns the formatted content binding", ->
      expect(Traction.Bindings.Factory(element, "attribute|formatter")).toBe formatBinding

  describe "when specification is just an attribute", ->
    propertyBinding = {}
    element = {}

    beforeEach ->
      spyOn(Traction.Bindings, "ContentBinding").andReturn(propertyBinding)

    it "instantiates an content binding", ->
      Traction.Bindings.Factory(element, "attribute")
      expect(Traction.Bindings.ContentBinding).toHaveBeenCalledWith element, "attribute"

    it "returns the content binding", ->
      expect(Traction.Bindings.Factory(element, "attribute")).toBe propertyBinding
