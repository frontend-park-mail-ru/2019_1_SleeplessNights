(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['container'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <div class=\"container__content-sidebar\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container "
    + container.escapeExpression(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"customClasses","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sideBar : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
})();