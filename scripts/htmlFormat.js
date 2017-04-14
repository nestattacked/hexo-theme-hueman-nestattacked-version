//format html files after renderred by hexo

var beautify = require('js-beautify');

hexo.extend.filter.register('after_render:html',function(str,data){
    //format html
    str = beautify.html(str,{
        indent_char:' ',
        indent_size:2,
        indent_inner_html:true,
        unformatted:['code','pre','em','strong','span']
    });
    //remove empty line
    return str.replace(/^\s*[\r\n]+/gm,'').replace(/(^,[\r\n]+)\s*$/g,'');
});
