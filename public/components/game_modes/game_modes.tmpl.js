(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['game_modes'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"container container_align-y_center\">\n    "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <div class=\"menu menu_horizontal\">\n        <div class=\"menu__btn menu__btn_huge\">\n            <h1>Single player</h1>\n        </div>\n        <div class=\"menu__btn menu__btn_huge\">\n            <h1>Multi player</h1>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();