(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['sidebar'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3='function', alias4=container.escapeExpression;

        return '<nav class="sidebar '
    + alias4(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'customClasses','hash':{},'data':data}) : helper)))
    + '">\n    <div class="sidebar__header">\n        <h1 class="sidebar__title">'
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'title','hash':{},'data':data}) : helper)))
    + '</h1>\n    </div>\n    <div class="sidebar__body">\n        '
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'body','hash':{},'data':data}) : helper))) != null ? stack1 : '')
    + '\n    </div>\n</nav>\n';
    },'useData':true});
})();