(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['panel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"panel panel_primary "
    + alias4(((helper = (helper = helpers.customPanelClass || (depth0 != null ? depth0.customPanelClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customPanelClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"panel__header\">\n        "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"panel__body "
    + alias4(((helper = (helper = helpers.customClass || (depth0 != null ? depth0.customClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customClass","hash":{},"data":data}) : helper)))
    + "\">\n        "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"panel__footer\">\n        "
    + ((stack1 = ((helper = (helper = helpers.footer || (depth0 != null ? depth0.footer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"footer","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});
})();