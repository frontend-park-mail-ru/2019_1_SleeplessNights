(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['menu'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda;

  return "        <div class=\"menu__btn "
    + container.escapeExpression(alias1(((stack1 = blockParams[0][0]) != null ? stack1.className : stack1), depth0))
    + "\">\n            "
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? stack1.content : stack1), depth0)) != null ? stack1 : "")
    + "\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"menu "
    + container.escapeExpression(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"customClasses","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true,"useBlockParams":true});
})();