(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['question'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3='function', alias4=container.escapeExpression;

        return '<div class="question '
    + alias4(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'customClasses','hash':{},'data':data}) : helper)))
    + '">\n    '
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'text','hash':{},'data':data}) : helper)))
    + '\n</div>\n';
    },'useData':true});
})();