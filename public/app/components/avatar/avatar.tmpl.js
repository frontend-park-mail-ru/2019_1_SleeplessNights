(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['avatar'] = template({'compiler':[7,'>= 4.0.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3='function', alias4=container.escapeExpression;

        return '<div class="avatar '
    + alias4(((helper = (helper = helpers.customClasses || (depth0 != null ? depth0.customClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'customClasses','hash':{},'data':data}) : helper)))
    + '">\n    <img src="'
    + alias4(((helper = (helper = helpers.avatarUrl || (depth0 != null ? depth0.avatarUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'avatarUrl','hash':{},'data':data}) : helper)))
    + '" id="'
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'id','hash':{},'data':data}) : helper)))
    + '" alt="avatar" class="avatar__upload-icon">\n</div>\n<div class="avatar__choose-photo">\n    '
    + ((stack1 = ((helper = (helper = helpers.customImgInput || (depth0 != null ? depth0.customImgInput : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'customImgInput','hash':{},'data':data}) : helper))) != null ? stack1 : '')
    + '\n</div>\n';
    },'useData':true});
})();