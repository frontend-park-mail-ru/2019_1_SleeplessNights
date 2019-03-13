(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['pagination'] = template({'1':function(container,depth0,helpers,partials,data) {
        var stack1;

        return '        '
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : '')
    + '\n';
    },'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

        return '<nav class="pagination" id="'
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === 'function' ? helper.call(alias1,{'name':'id','hash':{},'data':data}) : helper)))
    + '">\n'
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data})) != null ? stack1 : '')
    + '</nav>\n';
    },'useData':true});
})();