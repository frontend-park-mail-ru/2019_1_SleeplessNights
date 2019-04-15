(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['timer'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var helper;

        return '<span class="timer '
    + container.escapeExpression(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{'name':'customClasses','hash':{},'data':data}) : helper)))
    + '"> </span>\n';
    },'useData':true});
})();