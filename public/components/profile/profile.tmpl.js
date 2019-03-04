(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"container\">\n    "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <div class=\"card card_empty shadow-l\">\n        <div class=\"card__body\">\n            <h3>Никнейм</h3>\n            <div class=\"list\">\n                <span class=\"list__item\">Победы</span>\n                <span class=\"list__item\">Поражения</span>\n                <span class=\"list__item\">Время в игре</span>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();