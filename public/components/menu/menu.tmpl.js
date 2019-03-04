(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"container container_align-y_center\">\n    "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <ul class=\"menu list\">\n        <li class=\"list__item\">\n            <a class=\"menu__btn\" href=\"/game_modes\" data-href=\"gameModes\">Играть</a>\n        </li>\n        <li class=\"list__item\">\n            <a class=\"menu__btn\" href=\"/description\" data-href=\"description\">Описание</a>\n        </li>\n        <li class=\"list__item\">\n            <a class=\"menu__btn\" href=\"/leaders\" data-href=\"leaders\">Таблица рекордов</a>\n        </li>\n        <li class=\"list__item\">\n            <a class=\"menu__btn\" href=\"/profile\" data-href=\"profile\">Профиль игрока(временно)</a>\n        </li>\n        <li class=\"list__item-row\">\n            <a class=\"menu__btn list__item\" href=\"/login\" data-href=\"login\">Войти</a>\n            <a class=\"menu__btn list__item\" href=\"/signup\" data-href=\"signup\">Регистрация</a>\n        </li>\n    </ul>\n</div>\n";
},"useData":true});
})();