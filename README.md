# What is this

This is a hexo theme named hueman forked from [here](https://github.com/ppoffice/hexo-theme-hueman), and i modified it to suit my own needs. You can see my blog as a [DEMO](https://www.nestattacked.com).

# Install

### clone source code

    git clone git@github.com:nestattacked/hexo-theme-hueman-nestattacked-version.git themes/hueman

### edit blog's config

edit your blog's `_config.yml`, change the `theme` field to `human` to enable the theme.

    theme: hueman

make sure `post_asset_folder: true` in your `_config.yml`.

### install plugins

in order to make it work, we need to install some hexo plugins, cd into your blog folder first.

    npm install --save hexo-asset-image hexo-front-matter-excerpt hexo-generator-json-content

### install dependency for theme

    cd themes/hueman
    npm install

### edit theme's config

copy `_config.example.yml` to `_config.yml`.

    cd themes/huemen
    cp _config.example.yml _config.yml

# How to write articles

### create article

use hexo-cli to create a new article.

    hexo new your-article-name

### example of front matter

    ---
    title: your title
    excerpt: your excerpt
    recommend: 3
    tags:
      - tag1
      - tag2
    categories:
      - category1
      - category2
    date: 2017-11-11 11:11:11
    ---

### things about

this theme has a recommend widget in the sidebar, and the bigger recommend field's value of front matter is, the higger position the article will be displayed at.

don't make too much categories, because it will be showed in the menu, you will want to keep menu simple and clear.

when you create a new post `your-post`, hexo will create file `your-post.md` and folder `your-post` in folder `source`. we can put asset like pictures into folder `your-post`, and use it directly like this:

    ![](picture.jpg)

# Issues might bother you

### wrong language showed

set language in `_config.yml`, like `language: zh-CN`.

### how to change logo and favicon.ico

just replace file in `hueman/source/css/images`, file of logo is `logo-header.png`.

### why code doesn't highlight

in your article, you should specify the type of language like this:

    ```javascript
    function hello () {
        console.log('hello world!');
    }
    ```
