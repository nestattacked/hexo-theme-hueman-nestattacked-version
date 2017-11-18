# What is this

This is a hexo theme named hueman forked from [here](https://github.com/ppoffice/hexo-theme-hueman), and i modified it to suit my own needs.

# Install

### clone source code

```
git clone git@github.com:nestattacked/hexo-theme-hueman-nestattacked-version.git themes/hueman
```

### edit config

edit your blog's `_config.yml`, change the `theme` field to `human` to enable the theme

```
theme: hueman
```

make sure `post_asset_folder: true` in your `_config.yml`

### install plugins

in order to make it work, we need to install some hexo plugins, cd into your blog folder first

```
npm install --save hexo-asset-image hexo-front-matter-excerpt hexo-generator-json-content
```

# How to write articles

### create article

use hexo-cli to create a new article

```
hexo new your-article-name
```

### things about

this theme has a recommend widget in the sidebar, and the bigger recommend field's value of front matter is, the higger position the article will be displayed at.

don't make too much categories, because it will be showed in the menu, you will want to keep menu simple and clear.

when you create a new post `your-post`, hexo will create file `your-post.md` and folder `your-post` in folder `source`. we can put asset like pictures into folder `your-post`, and use it directly like this:

```
![](picture.jpg)
```
