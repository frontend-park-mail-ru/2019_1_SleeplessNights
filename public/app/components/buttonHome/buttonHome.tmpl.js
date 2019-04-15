(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['buttonHome'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3='function', alias4=container.escapeExpression;

        return '<a href="'
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'href','hash':{},'data':data}) : helper)))
    + '" data-href="'
    + alias4(((helper = (helper = helpers.dataHref || (depth0 != null ? depth0.dataHref : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'dataHref','hash':{},'data':data}) : helper)))
    + '" class="back-to-menu-btn '
    + alias4(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'className','hash':{},'data':data}) : helper)))
    + '">\n    <i class="material-icons md-48">arrow_back</i>\n</a>\n';
    },'useData':true});
})();