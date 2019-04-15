(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['gameBoard'] = template({'1':function(container,depth0) {
        var stack1;

        return '        '
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : '')
    + '\n';
    },'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

        return '<div class="container__square" id="'
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === 'function' ? helper.call(alias1,{'name':'id','hash':{},'data':data}) : helper)))
    + '">\n    <div class="game-board container__absolute">\n'
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cells : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data})) != null ? stack1 : '')
    + '    </div>\n</div>\n';
    },'useData':true});
})();
