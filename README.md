# What is this

This is a hexo theme named hueman forked from [here](https://github.com/ppoffice/hexo-theme-hueman), and I modified it to suit my own needs. You can see my blog as a [DEMO](https://www.nestattacked.com).

# Install

### Clone source code

    git clone git@github.com:nestattacked/hexo-theme-hueman-nestattacked-version.git themes/hueman

### Edit blog's config

Edit your blog's `_config.yml`, change the `theme` field to `human` to enable the theme.

    theme: hueman

Make sure `post_asset_folder: true` in your `_config.yml`.

### Install plugins

In order to make it work, we need to install some hexo plugins, cd into your blog folder first.

    npm install --save hexo-asset-image hexo-front-matter-excerpt hexo-generator-json-content

### Install dependency for theme

    cd themes/hueman
    npm install

### Edit theme's config

Copy `_config.example.yml` to `_config.yml`.

    cd themes/huemen
    cp _config.example.yml _config.yml

# How to write articles

### Create article

Use hexo-cli to create a new article.

    hexo new your-article-name

### Example of front matter

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
    thumbnail: thumbnail.jpg
    ---

### Things about

This theme has a recommend widget in the sidebar, and the bigger recommend field's value of front matter is, the higger position the article will be displayed at.

Don't make too much categories, because it will be showed in the menu, you will want to keep menu simple and clear.

When you create a new post `your-post`, hexo will create file `your-post.md` and folder `your-post` in folder `source`. We can put asset like pictures into folder `your-post`, and use it directly like this:

    ![](picture.jpg)

# Issues might bother you

### Wrong language showed

Set language in `_config.yml`, like `language: zh-CN`.

### How to change logo and favicon.ico

Just replace file in `hueman/source/css/images`, file of logo is `logo-header.png`.

### Why code doesn't highlight

In your article, you should specify the type of language like this:

    ```javascript
    function hello () {
        console.log('hello world!');
    }
    ```

### How does thumbnail work

If thumbnail is set in front matter, we will use it. Otherwise, system will try to get first picture in the article and use it as thumbnail. Lastly, if there is no picture in article, we will use default thumbnail picture.
