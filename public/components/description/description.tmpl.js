(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['description'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container-row\">\n    <nav class=\"card sidebar shadow-l\">\n        <div class=\"card__header\">\n            <h1 class=\"card__title\">Скрины</h1>\n        </div>\n        <div class=\"card__body\">\n            <div class=\"plug\">Скрин 1</div>\n            <div class=\"plug\">Скрин 2</div>\n            <div class=\"plug\">Скрин 3</div>\n            <div class=\"plug\">Скрин 4</div>\n        </div>\n    </nav>\n    <div class=\"container__content\">\n        "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <div class=\"card desc-block shadow-l\">\n            <div class=\"desc-text\">\n                <p>\n                    Классический «Lorem ipsum dolor sit amet…» проход отнести к ремиксов римского философа Цицерона 45 г. до н.э. текст De Finibus Bonorum et Malorum («О крайностями добра и зла»). Более конкретно, проход, как полагают, происходит из секций 1.10.32 - 33 из его текста, с наиболее заметным часть извлечена ниже:\n                    “Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.”\n                </p>\n            </div>\n            <div class=\"list-block\">\n                <h3>Авторы:</h3>\n                <ul class=\"list-pages\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.authors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();