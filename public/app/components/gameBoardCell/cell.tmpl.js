(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cell'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"game-board__cell "
    + alias4(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customClasses","hash":{},"data":data}) : helper)))
    + "\"\n     id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n     style=\"background-color: "
    + alias4(((helper = (helper = helpers.bgColor || (depth0 != null ? depth0.bgColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bgColor","hash":{},"data":data}) : helper)))
    + "\"\n     data-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\n</div>\n";
},"useData":true});
})();