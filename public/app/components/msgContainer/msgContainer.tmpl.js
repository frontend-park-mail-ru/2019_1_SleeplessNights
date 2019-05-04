(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['msgContainer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"msg-container "
    + alias4(((helper = (helper = helpers.containerClass || (depth0 != null ? depth0.containerClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"containerClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div>\n        <div class=\"msg-container__messages "
    + alias4(((helper = (helper = helpers.msgClass || (depth0 != null ? depth0.msgClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"msgClass","hash":{},"data":data}) : helper)))
    + "\">\n            <p>"
    + alias4(((helper = (helper = helpers.msgText || (depth0 != null ? depth0.msgText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"msgText","hash":{},"data":data}) : helper)))
    + "</p>\n            <time datetime=\""
    + alias4(((helper = (helper = helpers.datetime || (depth0 != null ? depth0.datetime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datetime","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</time>\n        </div>\n    </div>\n    <div class=\"msg__avatar\">\n        <img src=\""
    + alias4(((helper = (helper = helpers.avatarUrl || (depth0 != null ? depth0.avatarUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatarUrl","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n</div>\n";
},"useData":true});
})();