(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"container\">\n    "
    + ((stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"header","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <div class=\"card\">\n        <div class=\"card__header\">\n            <h1 class=\"card__title\">Авторизация</h1>\n        </div>\n        <div class=\"card__body\">\n            <form>\n                <div class=\"form__group\">\n                    <input type=\"text\" class=\"form__control\" placeholder=\"Почта или никнейм\" name=\"login\">\n                </div>\n                <div class=\"form__group\">\n                    <input type=\"password\" class=\"form__control\" placeholder=\"Пароль\" name=\"password\">\n                </div>\n                <div class=\"form__group\">\n                    <button type=\"submit\" class=\"btn btn_primary\">Войти</button>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class=\"card card_centered_both\">\n        <div class=\"card__body\">\n            У вас нет аккаунта? <a href=\"/signup\" data-href=\"signup\">Зарегистрироваться</a>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();