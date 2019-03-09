(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        "
    + ((stack1 = ((helper = (helper = helpers.btnHomeTemplate || (depth0 != null ? depth0.btnHomeTemplate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"btnHomeTemplate","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<header class=\"header\">\n    <h1 class=\"header__title\">\n        "
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n    </h1>\n    <h3 class=\"header__subtitle\">\n        "
    + ((stack1 = ((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </h3>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnHome : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</header>\n";
},"useData":true});
})();