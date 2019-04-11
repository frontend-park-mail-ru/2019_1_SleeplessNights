(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['gameBoard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"container__square\">\n    <div class=\"game-board container__absolute\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cells : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});
})();