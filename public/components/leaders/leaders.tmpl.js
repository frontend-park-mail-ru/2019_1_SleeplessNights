(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['leaders'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <tr>\n                        <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n                        <td>"
    + alias4(((helper = (helper = helpers.win || (depth0 != null ? depth0.win : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"win","hash":{},"data":data}) : helper)))
    + "</td>\n                        <td>"
    + alias4(((helper = (helper = helpers.lost || (depth0 != null ? depth0.lost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lost","hash":{},"data":data}) : helper)))
    + "</td>\n                        <td>"
    + alias4(((helper = (helper = helpers.playingTime || (depth0 != null ? depth0.playingTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playingTime","hash":{},"data":data}) : helper)))
    + "</td>\n                    </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container\">\n    "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <div class=\"card card_centered_both card_empty shadow-l\">\n        <div class=\"card__body\">\n            <table class=\"table\">\n                <tr>\n                    <th>Игрок</th>\n                    <th>Победы</th>\n                    <th>Поражения</th>\n                    <th>Время в игре</th>\n                </tr>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.players : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </table>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();