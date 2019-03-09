(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['board'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr>\n            <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.win || (depth0 != null ? depth0.win : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"win","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.lost || (depth0 != null ? depth0.lost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lost","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.playingTime || (depth0 != null ? depth0.playingTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playingTime","hash":{},"data":data}) : helper)))
    + "</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table\">\n    <tr>\n        <th>Игрок</th>\n        <th>Победы</th>\n        <th>Поражения</th>\n        <th>Время в игре</th>\n    </tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.players : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n";
},"useData":true});
})();