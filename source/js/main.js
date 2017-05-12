(function ($) {
    // To top button
    $('#back-to-top').on('click', function () {
        $('body, html').animate({ scrollTop: 0 }, 400);
    });

    // To content button
    $('#back-to-contents').on('click', function(){
        $('body, html').animate({scrollTop:$('.toc-title').offset().top}, 400);
    })

    // Nav bar toggle
    $('#main-nav-toggle').on('click', function () {
        $('.nav-container-inner').slideToggle();
    });

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            // 对于已经包含在链接内的图片不适用lightGallery
            if ($(this).parent().prop("tagName") !== 'A') {
                $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });

    });
    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item',
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

    // Sidebar expend
    $('#sidebar .sidebar-toggle').click(function () {
        if($('#sidebar').hasClass('expend')) {
            $('#sidebar').removeClass('expend');
            $('.sidebar-toggle').removeClass('sidebar-toggle-expend');
        } else {
            $('#sidebar').addClass('expend');
            $('.sidebar-toggle').addClass('sidebar-toggle-expend');
        }
    });


    // Remove extra main nav wrap
    $('.main-nav-list > li').unwrap();

    // Highlight current nav item
    $('#main-nav > li > .main-nav-list-link').each(function () {
        if($('.page-title-link').length > 0){
            if ($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()) {
                $(this).addClass('current');
            } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')) {
                $(this).addClass('current');
            }
        }
    });

    // Auto hide main nav menus
    function autoHideMenus(){
        var max_width = $('.nav-container-inner').width() - 10;
        var main_nav_width = $('#main-nav').width();
        var sub_nav_width = $('#sub-nav').width();
        if (main_nav_width + sub_nav_width > max_width) {
            // If more link not exists
            if ($('.main-nav-more').length == 0) {
                $(['<li class="main-nav-list-item top-level-menu main-nav-more">',
                    '<a class="main-nav-list-link" href="javascript:;">More</a>',
                    '<ul class="main-nav-list-child">',
                    '</ul></li>'].join('')).appendTo($('#main-nav'));
                // Bind hover event
                $('.main-nav-more').hover(function () {
                    if($(window).width() < 600) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideDown('fast');
                }, function () {
                    if($(window).width() < 600) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideUp('fast');
                });
            }
            var child_count = $('#main-nav').children().length;
            for (var i = child_count - 2; i >= 0; i--) {
                var element = $('#main-nav').children().eq(i);
                if (main_nav_width + sub_nav_width > max_width) {
                    element.prependTo($('.main-nav-more > ul'));
                    main_nav_width = $('#main-nav').width();
                } else {
                    return;
                }
            }
        }
        // Nav bar is wide enough
        if ($('.main-nav-more').length > 0) {
            $('.main-nav-more > ul').children().appendTo($('#main-nav'));
            $('.main-nav-more').remove();
        }
    }
    autoHideMenus();

    $(window).resize(function () {
        autoHideMenus();
    });

    // Fold second-level menu
    $('.main-nav-list-item').hover(function () {
        if ($(window).width() < 600) {
            return;
        }
        $(this).children('.main-nav-list-child').stop().slideDown('fast');
    }, function () {
        if ($(window).width() < 600) {
            return;
        }
        $(this).children('.main-nav-list-child').stop().slideUp('fast');
    });

    // Add second-level menu mark
    $('.main-nav-list-item').each(function () {
        if ($(this).find('.main-nav-list-child').length > 0) {
            $(this).addClass('top-level-menu');
        }
    });

    //throttle function wrapper
    function throttle(func, wait){
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
            previous = new Date;
            timeout = null;
            result = func.apply(context, args);
        };
        return function(){
            var now = new Date;
            var remaining = wait-(now-previous);
            context = this;
            args = arguments;
            if(remaining<=0){
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            }else if(!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }

    //add fold and unfold function to catalog
    function activateCatalogExpand(){
        $('.toc').on('click','.toc-level-1 > a, .toc-level-2 > a',function(event){
            var title = $(this).find('.toc-text');
            var isFold = /^[\s\S]* \(\d+\)$/.test(title.text());
            if(isFold){
                title.text(/(^[\s\S]*) \(\d+\)$/.exec(title.text())[1]);
                $(this).next().css('display','block');
                event.preventDefault();
            }else{
                var subtitleNum = $(this).next().children().length;
                if(subtitleNum>0){
                    title.text(title.text()+' ('+subtitleNum+')');
                    $(this).next().css('display','none');
                    event.preventDefault();
                }
            }
        });
    }

    //helper for adjustCatalog
    function clearStyle(elements){
        elements.forEach(function(element){
            element.removeAttr('style');
        });
    }
    function setAbsoluteStyle(elements){
        var bottom = 0;
        elements.reverse();
        elements.forEach(function(element){
            element.css('position','absolute');
            element.css('bottom',bottom);
            bottom += element.outerHeight();
        });
    }
    function setFixedStyle(elements){
        var top = 0;
        elements.forEach(function(element){
            element.css('position','fixed');
            element.css('top',top);
            top += element.outerHeight();
        });
    }
    //make title of contents always available
    function adjustCatalog(){
        var isWideScreen = window.innerWidth >= 960;
        var isMobile = window.innerWidth <= 599;
        var target = $('.toc-title');
        var marginTop = 0;
        var targetOffsetTop = $('#header').outerHeight();

        //clear style for catalog
        clearStyle([$('.toc'),$('.toc-title'),$('.sidebar-toggle')]);

        if(!isMobile){
            //calculate location where catalog should be
            var catalogHeight = $('.toc-title').outerHeight() + $('.toc').outerHeight();
            var availableSpaceHeight = $('#main').outerHeight();
            if(isWideScreen){
                availableSpaceHeight -= $('.sidebar-top').outerHeight();
            }else{
                target = $('.sidebar-toggle');
                catalogHeight += $('.sidebar-toggle').outerHeight();
                targetOffsetTop = $('#header').height();
            }
            marginTop = $(window).scrollTop() - targetOffsetTop;

            //get elements which need to be relocate
            var catalogElements = [];
            if(!isWideScreen){
                catalogElements.push($('.sidebar-toggle'));
            }
            catalogElements.push($('.toc-title'));
            catalogElements.push($('.toc'));

            if(marginTop<0){
            }else if(marginTop>(availableSpaceHeight-catalogHeight)){
                setAbsoluteStyle(catalogElements);
            }else{
                setFixedStyle(catalogElements);
            }
        }
    }
    //only used in post page
    if($('[itemprop="blogPost"]').length>0){
        var throttledAdjustCatalog = throttle(adjustCatalog,20);
        $(window).scroll(throttledAdjustCatalog);
        $(window).resize(throttledAdjustCatalog);
    }
    //when loaded, set catalog to right place
    $(adjustCatalog);
    $(activateCatalogExpand);
})(jQuery);
