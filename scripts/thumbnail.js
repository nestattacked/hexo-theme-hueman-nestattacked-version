/**
* Thumbnail Helper
* @description Get the thumbnail url from a post
* @example
*     <%- thumbnail(post) %>
*/

var yaml = require('yaml-front-matter');

hexo.extend.helper.register('thumbnail', function (post) {
    var thumbnail = yaml.loadFront(post.raw).thumbnail;
    if (thumbnail !== undefined) {
        return hexo.config.root + post.path + thumbnail;
    } else {
        var imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/ig;
        var result = imgPattern.exec(post.content);
        if (result && result.length > 1) {
            return result[1];
        } else {
            return '';
        }
    }
});
