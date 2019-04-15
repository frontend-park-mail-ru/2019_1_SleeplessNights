(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['formControl'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3='function', alias4=container.escapeExpression;

        return '<input type="'
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'type','hash':{},'data':data}) : helper)))
    + '"\n       id="'
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'id','hash':{},'data':data}) : helper)))
    + '"\n       class="form__control '
    + alias4(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'customClasses','hash':{},'data':data}) : helper)))
    + '"\n       placeholder="'
    + alias4(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'placeholder','hash':{},'data':data}) : helper)))
    + '"\n       name="'
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'name','hash':{},'data':data}) : helper)))
    + '"\n       value="'
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'value','hash':{},'data':data}) : helper)))
    + '"\n>\n<span class="fd_invalid">'
    + alias4(((helper = (helper = helpers.fdInvalid || (depth0 != null ? depth0.fdInvalid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'fdInvalid','hash':{},'data':data}) : helper)))
    + '</span>\n';
    },'useData':true});
})();