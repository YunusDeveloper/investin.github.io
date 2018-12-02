jQuery(document).ready(function ($) {

    'use-strict';

    var $window = $(window);

    /**
     * Count To
     * @constructor
     */
    function OScountTo() {
        $('.counter-group').each(function (index) {
            var $this = $(this);
            $window.on('scroll', function () {
                var WindowToTop = $window.scrollTop();
                var itemToTop = $this.offset().top;
                if (WindowToTop + $window.height() > itemToTop + $this.height()) {
                    $this.find('.timer:not(.counted)').countTo().addClass('counted');
                }
            });
        });
    }

    OScountTo();

    /**
     * Count Down
     * @constructor
     */
    function OScountDown() {
        $('.countdown').each(function () {
            $(this).final_countdown()
        });
    }

    OScountDown();

    /**
     * Price Filter
     * @constructor
     */
    function OsPriceFilter() {
        $(".price-filter").each(function() {
            var $sliderRange = $(this).find('.price-slider-range'),
                $valueFrom = $(this).find('span.from'),
                $valueTo = $(this).find('span.to');

            $sliderRange.slider({
                range: true,
                min: 0,
                max: 400,
                values: [ 1, 200 ],
                slide: function( event, ui ) {
                    $valueFrom.text("$" + ui.values[ 0 ]);
                    $valueTo.text("$" + ui.values[ 1 ]);
                }
            });

            $valueFrom.text("$" + $sliderRange.slider( "values", 0 ));
            $valueTo.text("$" + $sliderRange.slider( "values", 1 ));
        });
    }

    if ($('.price-filter').find('.price-slider-range').length > 0) {
        OsPriceFilter();
    }

    /**
     * Nav
     * @constructor
     */

    function OsNavMenuActiveLink() {
        var url = window.location.pathname
        var filename = url.substring(url.lastIndexOf('/') + 1);
        $(".nav-main-menu li a").each(function () {
            if ($(this).attr('href') === filename) {
                $(this).parents(".nav-main-menu li").addClass('current-menu-item');
            }
            ;
        });
    }

    OsNavMenuActiveLink();

    function OsNavMainMenu() {

        var $nav_MainMenu = $(".nav-main-menu");

        $window.on('resize load', function () {
            $nav_MainMenu.each(function () {
                var mainNav_height = $(this).filter(".small-screen").parents("nav").outerHeight();
                var mainMenu_height = $window.height() - mainNav_height;
                $(this).filter(".small-screen").css("max-height", mainMenu_height);
            });
        });

        $(".nav-main-menu a[href='#']").on('click', function (event) {
            event.preventDefault();
        });

        $nav_MainMenu.each(function () {
            $(this)
                .find("li:has(ul)")
                .not("ul.mega-menu-content li, .menu-tabs li")
                .addClass("sub-menu");

            $(this).find(">li li:has(ul)").children("a").on('click', function (event) {
                event.preventDefault();
            });
            ;

            $(this)
                .filter(".small-screen, .left-menu")
                .find("li:has(ul)")
                .addClass("menu-dropdown");

            $(this).filter(".small-screen, .left-menu").find(".menu-dropdown > a").each(function () {
                $(this).siblings('ul').hide();
                $(this).on("click", function (event) {
                    event.preventDefault();
                    menu_DropdownTrigger(this);
                });
            });

            function menu_DropdownTrigger(selector) {
                if ($(selector).hasClass('menu-trigger')) {
                    $(selector).parent('li')
                        .find('a')
                        .removeClass('menu-trigger')
                        .parent('li')
                        .children('ul')
                        .slideUp(400);
                } else {
                    $(selector)
                        .addClass('menu-trigger')
                        .parent('li')
                        .siblings()
                        .find('a')
                        .removeClass('menu-trigger')
                        .parent('li')
                        .children('ul')
                        .slideUp(400);

                    $(selector)
                        .siblings('ul').slideDown(400);
                }
            }
        });
    }

    OsNavMainMenu();

    function OsMainMenu_opened() {
        $(".main-nav").each(function () {
            var $mainNav = $(this);
                $menuTriger = $(this).find('.nav-hamburger'),
                $eventMarker = $(this).find('.nav-hamburger-wrapper');
            $menuTriger.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                if ($eventMarker.is(":visible")) {
                    if (!($mainNav.hasClass('main-menu-opened'))) {
                        $mainNav.addClass('main-menu-opened');
                    }
                    
                    else {
                        $mainNav.removeClass('main-menu-opened');
                        setTimeout(function () {
                            $mainNav
                                .find('.nav-main-menu.small-screen .menu-dropdown > a')
                                .removeClass('menu-trigger')
                                .siblings('ul').hide();
                        }, 400);
                    }
                }
            });

            $window.on('resize load', function(event) {
                if ($eventMarker.is(":visible") && ($mainNav.hasClass('main-menu-opened'))) {
                    $mainNav.removeClass('main-menu-opened');
                }
            });
        });
    }

    OsMainMenu_opened();

    function OsNavContent_creativePage_toggle() {
        $(".main-nav.creative-page .nav-hamburger-special").each(function () {
            $(this).on('click', function (event) {
                event.preventDefault();
                var $this = $(this);
                if (!($this.parents(".main-nav").hasClass('nav-content-toggle'))) {
                    $this
                        .parents(".main-nav")
                        .addClass('nav-content-toggle');
                }
                else {
                    $this
                        .parents(".main-nav")
                        .removeClass('nav-content-toggle');
                }
            });
        });
    }

    OsNavContent_creativePage_toggle();

    function OsNavSearch_toggle() {
        $(".main-nav").each(function () {
            var $mainNav = $(this);

            $(this).find(".search-trigger-show").on('click', function (event) {
                event.preventDefault();
                var $triggerShow = $(this);
                if (!($mainNav.hasClass('nav-search-opened'))) {
                    $mainNav.addClass('nav-search-opened');
                    
                    if ($mainNav.hasClass('main-menu-opened')) {
                        $mainNav.removeClass('main-menu-opened');
                        
                        setTimeout(function () {
                            $mainNav
                                .find('.nav-main-menu.small-screen .menu-dropdown > a')
                                .removeClass('menu-trigger')
                                .siblings('ul').hide();
                        }, 400);
                    }
                }
            });

            $(this).find('.search-trigger-hide').on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $mainNav.removeClass('nav-search-opened');
            });
        });
    }

    OsNavSearch_toggle();

    function OsNavShopCart() {
        $(".main-nav").each(function () {
            var $mainNav = $(this),
                $navShopCart_container = $(this).find(".nav-top-cart-wrapper")
                $navShopCart = $(this).find(".nav-shop-cart"),
                $navShopCart_trigger = $(this).find(".nav-cart-trigger"),
                $navMenuItem = $(this).find(".nav-main-menu > .sub-menu"),
                $eventMarker = $(this).find('.nav-hamburger-wrapper');

            $window.on('resize load', function () {
                var mainNav_height = $mainNav.parents("nav").outerHeight();
                var navShopCart_height = $window.height() - mainNav_height;
                $navShopCart.css("max-height", navShopCart_height);
            });
            
            $navShopCart.hide();

            $navShopCart_trigger.on('click', function(event) {
                event.preventDefault();
                if ($navShopCart.is(':hidden')) {
                    if ($eventMarker.is(":visible") && $mainNav.hasClass('main-menu-opened')) {
                        $navShopCart.fadeIn();
                        $mainNav.removeClass('main-menu-opened');
                        
                        setTimeout(function () {
                            $mainNav
                                .find('.nav-main-menu.small-screen .menu-dropdown > a')
                                .removeClass('menu-trigger')
                                .siblings('ul').hide();
                        }, 400);
                    }
                    else {
                        $navShopCart.fadeIn();
                    }
                }

                else {
                    $navShopCart.fadeOut();
                }
            });

            $(document).mouseup(function (e) {
                if (!$navShopCart_container.is(e.target)
                    && $navShopCart_container.has(e.target).length === 0)
                {
                    $navShopCart.fadeOut();
                }
            });

            $navMenuItem.on('mouseenter', function(event) {
                if ($eventMarker.is(":hidden") && ($navShopCart.is(':visible'))) {
                    $navShopCart.fadeOut();
                }
            });
        });
    }
    OsNavShopCart();
    /**
     * Masonry Layout
     * @constructor
     */
    function OSmasonryLayout() {
        $('.masonry-container').each(function () {
            $grid = $(this).isotope({
                layoutMode: 'masonry',
                itemSelector: "*[class*='col-']"
            });
            $grid.imagesLoaded().progress(function () {
                $grid.isotope('layout');
            });
        });
    }

    OSmasonryLayout();

    /**
     * Isotope
     * @constructor
     */
    function OsIsotop() {

        $('.isotope-container').each(function () {
            var $this = $(this);
            var $grid = $this.find('.iso-grid').isotope({
                layoutMode: 'packery',
                itemSelector: '.grid-item',
                transitionDuration: '0.4s'
            });

            $grid.imagesLoaded().progress(function () {
                $grid.isotope('layout');
            });

            var $Filter = $this.data('filter-nav') ? $($this.data('filter-nav')) : $this.find('.portfolio-filter-group');
            $Filter.find('.iso-button').on('click', function (event) {
                event.preventDefault();
                $grid.isotope({filter: $(this).attr('data-filter')});
                $(this).siblings().removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    }

    OsIsotop();

    /**
     * Coverbox
     * @param $selector
     * @constructor
     */

    function OsCoverBox($selector) {
        $children = $selector.children('.cover-box');
        var oldCol = 0;
        // reinit cover box if number col change , change to normal style if data-* in current window screen was not set
        $window.on('resize load', function () {
            var numCol = returnNumcol($selector);

            if (numCol === 0) {
                $children.removeClass('active').addClass('normal-style').css({
                    'width': '100%',
                    'margin-right': '0%'
                });
                oldCol = numCol;
            }
            else if (!(numCol === oldCol)) {
                $children.initBox(numCol);
                $children.filter(function (index) {
                    return index % numCol === 0;
                }).activeBox(numCol);
                oldCol = numCol;
            }
        });
        //switch class active in row of coverbox
        $children.on('mouseover', function () {
            var numCol = returnNumcol($selector);
            if (numCol > 0 && !($(this).hasClass('active'))) {
                var From = parseInt($(this).index() / numCol, 10) * numCol;
                $children.slice(From, From + numCol).deactiveBox();
                $(this).activeBox(numCol);
            }
        });

        function returnNumcol($elem) {
            var WW = $window.width();
            var numCol = 0;
            if (WW >= 480) {
                numCol = $elem.data('xs') || numCol;
            }
            if (WW >= 768) {
                numCol = $elem.data('sm') || numCol;
            }
            if (WW >= 992) {
                numCol = $elem.data('md') || numCol;
            }
            if (WW >= 1230) {
                numCol = $elem.data('lg') || numCol;
            }
            if (WW >= 1400) {
                numCol = $elem.data('xlg') || numCol;
            }
            return numCol;
        }

        $.fn.initBox = function (numCol) {
            $(this).removeClass('active normal-style');
            $(this).css({
                'width': 100 / (numCol + 1) + '%',
                'margin-right': '0%'
            });
        };
        $.fn.activeBox = function (numCol) {
            $(this).addClass('active');
            $(this).css('margin-right', 100 / (numCol + 1) + '%');
        };
        $.fn.deactiveBox = function () {
            $(this).removeClass('active');
            $(this).css('margin-right', '0');
        }
    }

    /**
     * Active Coverbox
     * @constructor
     */
    function OsCoverBoxActive() {
        $(".cover-box-container").each(function () {
            OsCoverBox($(this));
        });
    }

    OsCoverBoxActive();

    /**
     * Parallax background
     * @constructor
     */
    function OsParallax() {
        $window.stellar({
            scrollProperty: 'scroll',
            positionProperty: 'transform',
            horizontalScrolling: false,
            verticalScrolling: (Modernizr.csstransitions),
            responsive: true,
            parallaxBackgrounds: true
        });
    }

    OsParallax();

    /**
     * Rating star
     * @constructor
     */
    function OsRatingStar() {
        $('.star-ratings').each(function () {
            var point = parseInt($(this).attr('data-rating'),10);
            if (point === 5) {
                $(this).children("span").addClass('rated');
            } else {
                $(this).children().eq(point).prevAll().addClass('rated');
            }
        });
    }

    OsRatingStar();

    /**
     * Portfolio Images Galley with magnific popup
     * @constructor
     */
    function OsPortfolioZoomedGallery() {

        $('.portfolio-group ').each(function () {
            $(this).magnificPopup({
                delegate: '.zoom-link', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
                zoom: {
                    enabled: true,
                    duration: 300,
                    easing: 'ease-in-out',
                    opener: function (openerElement) {
                        if (openerElement.hasClass('img-wrapper')) {
                            return openerElement.find('img');
                        }
                        else {
                            return openerElement.parents('.overlay');
                        }

                    }
                }
            });
        });
    }

    OsPortfolioZoomedGallery();

    /**
     * Zoomed Image (not portfolio image)
     * @constructor
     */
    function OsZoomedImg() {
        $('.zoomed-img-container').each(function () {
            $(this).find(".mfp-item").magnificPopup({
                gallery: {enabled: true},
                type: 'image',
                mainClass: 'mfp-fade',

                zoom: {
                    enabled: ($(this).hasClass('animation-zoom') ? true : false),
                    duration: 300,
                    easing: 'ease-in-out',
                    opener: function (openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });
        });
    }

    OsZoomedImg();

    /**
     * Simple Slider
     * @constructor
     */
    function OsSimpleSlider() {
        $(".simple-slider").each(function () {
            $(this).slick({
                fade: ($(this).hasClass('animation-slide') ? false : true),
                autoplay: true,
                speed: 400,
                dots: ($(this).hasClass('control-nav') ? true : false),
                autoplaySpeed: $(this).data('time') || 5000,
                adaptiveHeight: ($(this).hasClass('height-auto') ? true : false),
                arrows: ($(this).hasClass('dir-nav') ? true : false)
            });
        });
    }

    OsSimpleSlider();

    /**
     * Multiple item slider
     * @constructor
     */
    function OsMultiSlider() {
        $(".multi-slider").each(function () {
            $(this).slick({
                autoplay: true,
                // arrows: false,
                // infinite: false,
                slidesToShow: 6,
                swipeToSlide: true,
                speed: 400,
                dots: ($(this).hasClass('control-nav') ? true : false),
                autoplaySpeed: $(this).data('time') || 5000,
                // autoplaySpeed: 2000,
                arrows: ($(this).hasClass('dir-nav') ? true : false),
                responsive: [

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5
                        }
                    },

                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4
                        }
                    },

                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    },

                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    },

                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }

                ]
            });

        });
    }

    OsMultiSlider();

    /**
     * Thumbnail slider
     * @constructor
     */
    function OsThumbnailSlider() {
        $(".thumbnail-slider").each(function () {
            var $this = $(this);
            var $slider01 = $this.find(".syn-slider-1");
            var $slider02 = $this.find(".syn-slider-2");
            var uniqueID = $this.attr('id');
            var asNavForText = '.thumbnail-slider';
            if (!(uniqueID === undefined)) {
                asNavForText = '#' + uniqueID;
            }
            $slider01.slick({
                fade: ($slider01.hasClass('animation-slide') ? false : true),
                autoplay: true,
                speed: 400,
                dots: ($slider01.hasClass('control-nav') ? true : false),
                autoplaySpeed: $slider01.data('time') || 5000,
                // autoplaySpeed: 2000,

                adaptiveHeight: ($slider01.hasClass('height-auto') ? true : false),
                // adaptiveHeight: true,
                asNavFor: asNavForText + ' .syn-slider-2',
                arrows: ($slider01.hasClass('dir-nav') ? true : false)
            });


            $slider02.slick({
                focusOnSelect: true,
                autoplay: true,
                slidesToShow: 5,
                swipeToSlide: true,
                speed: 400,
                dots: ($slider02.hasClass('control-nav') ? true : false),
                autoplaySpeed: $slider02.data('time') || 5000,
                arrows: ($slider02.hasClass('dir-nav') ? true : false),
                asNavFor: asNavForText + ' .syn-slider-1',
                centerMode: true,
                centerPadding: '0px',
                responsive: [

                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },

                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1
                        }
                    }

                ]
            });

        });
    }

    OsThumbnailSlider();

    /**
     * Product thumbnail slider
     * @constructor
     */
    function OsProductThumbnailSlider(container) {
        var $sliderContainer = container ? container : $(".product-thumbnail-slider");
        $sliderContainer.each(function () {
            var $this = $(this),
                $slider01 = $this.find(".syn-slider-1"),
                $slider02 = $this.find(".syn-slider-2"),
                uniqueID = $this.attr('id'),
                asNavForText = '.product-thumbnail-slider';

            if (!(uniqueID === undefined)) {
                asNavForText = '#' + uniqueID;
            }

            $slider01.slick({
                lazyLoad: 'ondemand',
                infinite: false,
                fade: ($slider01.hasClass('animation-slide') ? false : true),
                speed: 400,
                adaptiveHeight: ($slider01.hasClass('height-auto') ? true : false),
                asNavFor: asNavForText + ' .syn-slider-2',
                arrows: ($slider01.hasClass('dir-nav') ? true : false)
            });

            $slider02.slick({
                lazyLoad: 'ondemand',
                swipeToSlide: true,
                focusOnSelect: true,
                infinite: false,
                slidesToShow: 4,
                speed: 400,
                arrows: ($slider02.hasClass('dir-nav') ? true : false),
                asNavFor: asNavForText + ' .syn-slider-1',
                centerPadding: '0px',
                responsive: [

                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },

                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });

            $slider01.on('beforeChange', function(event,slick,currentSlide,nextSlide) {
                $slider02
                    .find('.slick-slide')
                    .removeClass('slick-current')
                    .eq(nextSlide)
                    .addClass('slick-current');
            });
        });
    }

    OsProductThumbnailSlider();

    /**
     * Caption slider
     * @constructor
     */

    function OsCaptionSlider() {
        $(".caption-slider").each(function () {

            //on start
            $(this).on('init', function (event, slick) {
                OsSliderCaptionInit($(this));
                OsSliderCaptionShow($(this));
            });

            //init slick
            $(this).slick({
                fade: ($(this).hasClass('animation-slide') ? false : true),
                autoplay: true,
                speed: 400,
                pauseOnHover: false,
                dots: ($(this).hasClass('control-nav') ? true : false),
                autoplaySpeed: $(this).data('time') || 8000,
                adaptiveHeight: ($(this).hasClass('height-auto') ? true : false),
                arrows: ($(this).hasClass('dir-nav') ? true : false)
            });

            //on before slide
            $(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                OsSliderCaptionHide($(this));
            });
            //on after slide done
            $(this).on('afterChange', function (event, slick, currentSlide) {
                OsSliderCaptionShow($(this));
            });

            //support function
            function OsSliderCaptionInit(container) {
                var $sliderElement = container.find('.caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var animationDuration = "1000ms";

                    if ($(this).data("animation-duration")) {
                        animationDuration = $(this).data("animation-duration") + "ms";
                    }

                    $(this).css("animation-duration", animationDuration);
                    $captionAnimation.addClass('caption-hide');
                });
            }

            function OsSliderCaptionShow(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function (index) {
                    var $captionAnimation = $(this);
                    var delayTime = $(this).data("caption-delay") || (index * 350 + 400);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    setTimeout(function () {
                        $captionAnimation.removeClass('caption-hide').addClass(captionAnimationData);
                    }, delayTime);
                });
            }

            function OsSliderCaptionHide(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    $captionAnimation.removeClass(captionAnimationData).addClass('caption-hide');
                });
            }
        });
    }

    OsCaptionSlider();

    function OsCaptionSliderFw_Height() {
        $(".home-fw-slider.parents-height").each(function () {
            var $this = $(this);
            var $target = $(this).find(".item-image");

            $window.on('resize load', function () {
                $target.css("max-height", $this.height());
            });
        });
    }

    OsCaptionSliderFw_Height();

    /**
     * Init slipscreen page
     * @constructor
     */
    function OsSlipScreenLoading() {
        var slipOn = false;
        OsSlipScreen();

        $window.on('resize load', function () {
            if ($(this).width() < 992) {
                slipOn = false;
                $.fn.fullpage.destroy('all');
            }
            else {
                OsSlipScreen();
            }

        });

        function OsSlipScreen() {
            $('.fullpage-container').each(function () {
                var $this = $(this);
                if (slipOn === false) {
                    slipOn = true;
                    $this.fullpage({
                        anchors: ['sectionHome', 'sectionAbout', 'sectionPortfolio', 'sectionServices', 'sectionBlog', 'sectionContact'],
                        navigation: true,
                        navigationTooltips: ['HOME', 'ABOUT', 'PORTFOLIO', 'SERVICES', 'BLOG', 'CONTACT'],
                        menu: '#slip-menu',
                        scrollOverflow: true
                    });
                }
            });
        }
    }

    if ($('.fullpage-container').length > 0) {
        OsSlipScreenLoading();
    }

    /**
     * Nav Onepage Easing Click
     * @constructor
     */
    function OsNavOnepageEasing() {
        $('#main-nav-onepage a[href^="#"]').not('[href="#"]').on('click', function () {
            event.preventDefault();
            var $this = $(this);
            var elementPostion = $($this.attr('href')).offset().top;
            $('html,body').animate({
                    scrollTop: elementPostion - 60,
                },
                400
            );
        });
    }

    OsNavOnepageEasing();


    /**
     * Sticky nav
     * @constructor
     */
    function OsStickyNav_allScreen() {
        var $elem = $(".main-nav").not(".home-sticky-nav");

        $elem.each(function () {
            var $navWrapper = $(this).parents(".main-nav-wrapper");
            var $nav = $(this).parent("nav");
            var stickyNavTop = 0;

            $window.on('resize load', function () {
                stickyNavTop = $navWrapper.offset().top;
            });

            $window.on('scroll', function () {
                if ($window.scrollTop() > stickyNavTop) {
                    $navWrapper.addClass('sticky-nav');
                }

                else {
                    $navWrapper.removeClass('sticky-nav');
                }
            });
        });
    }

    OsStickyNav_allScreen();

    function OsStickyNav_headerTrigger() {
        var $body = $("body").has(".main-nav.home-sticky-nav, header.home-sticky-nav-trigger");
        var $elem = $body.find(".main-nav.home-sticky-nav");
        var $siteHeader = $body.find("header.home-sticky-nav-trigger");

        $elem.each(function () {
            var $navWrapper = $(this).parents(".main-nav-wrapper");
            var $nav = $(this).parent("nav");
            var stickyNavTop = $navWrapper.offset().top;
            var $eventMarker = $(this).find('.nav-hamburger-wrapper');

            $window.on('resize load scroll', function () {
                if ($eventMarker.is(":visible")) {
                    if ($window.scrollTop() > stickyNavTop) {
                        $navWrapper.addClass('sticky-nav');
                    }

                    else {
                        $navWrapper.removeClass('sticky-nav');
                    }
                }

                if ($eventMarker.is(":hidden")) {
                    var siteHeader_height = $siteHeader.outerHeight();
                    var nav_height = $nav.data("sticky-nav-height") || 60;

                    if ($window.scrollTop() >= siteHeader_height - nav_height) {
                        $navWrapper.addClass('sticky-nav');
                    }

                    else {
                        $navWrapper.removeClass('sticky-nav');
                    }
                }
            });
        });
    }

    OsStickyNav_headerTrigger();

    /**
     * Scroll next section of home
     * @constructor
     */
    function OSHomeGetStart() {
        $('.home-get-start a').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $window.height()}, 400);
        });
    }

    OSHomeGetStart();
    
    /**
     * Modals
     * @constructor
     */
    function OsModal() {
        $('.modal').each(function(index, el) {

           $(this).on('show.bs.modal', function () {
                if ($(document).height() > $(window).height()) {
                    // no-scroll
                    $('body').addClass("modal-open-noscroll");
                }
                else {
                    $('body').removeClass("modal-open-noscroll");
                }
            })

            $(this).on('hide.bs.modal', function () {
                $('body').removeClass("modal-open-noscroll");
            })

            $(this).on( 'mousewheel', function ( e ) {
                var event = e.originalEvent,
                    d = event.wheelDelta || -event.detail;

                this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });
        });
    }
    OsModal();

    /**
     * Quick view
     * @constructor
     */
    function OsQuickView() {
        $('.modal').each(function(index, el) {
            $(this).on('shown.bs.modal', function () {
                $(this).find('.product-thumbnail-slider .syn-slider-1').slick('setDimensions');
                $(this).find('.product-thumbnail-slider .syn-slider-2').slick('setDimensions');
            });
        });
    }
    OsQuickView();


    /**
     * Progress bar
     * @param $container
     * @constructor
     */
    function OsProgressbar($container) {
        $container.find('.progressbar').progressbar({display_text: 'center'});
    }

    /**
     * Active Progress bar
     * @constructor
     */
    function OsProgressbarActive() {
        $('.progressbar-wrapper').each(function () {
            var $this = $(this);
            $this.waypoint({
                handler: function (direction) {
                    OsProgressbar($this);
                },
                offset: "68%"
            });
        })
    }

    OsProgressbarActive();

    /**
     * Piechart
     * @constructor
     */
    function OsPiechart() {
        $('.piechart').each(function () {
            var $this = $(this);
            var value = Number($this.data("value")) / 100;
            var option;

            if ($this.hasClass('piechart-icon')) {
                option = {
                    strokeWidth: 6,
                    trailWidth: 6,
                    duration: 1500,
                    easing: 'bounce'
                };
            }
            else {
                option = {
                    strokeWidth: 5,
                    trailWidth: 5,
                    duration: 1500,
                    easing: 'bounce',
                    text: {
                        value: '0%'
                    },
                    step: function (state, bar) {
                        bar.setText((bar.value() * 100).toFixed(0) + "%");
                    }
                }
            }

            var circle = new ProgressBar.Circle($(this)[0], option);

            $this.waypoint({
                handler: function (direction) {
                    circle.animate(value);
                },
                offset: "68%"
            });

        });

    }

    OsPiechart();

    /**
     * Submit contact form with ajax
     * @constructor
     */
    function OsContactSubmit() {
        $('#contact_form').on('submit', function (event) {
            event.preventDefault();

            var $submit_button = $(this).find('button[type="submit"]');
            var backup_button = $submit_button.html();
            var data = $(this).serialize();

            $submit_button.html('PROCESSING').attr('disabled','disabled');

            $.ajax({
                type : "POST",
                url : 'phpscript/contact.php',
                data : data,

                // Notify result
                success : function (result) {
                    if(result == ""){
                        $submit_button.html('SUCCESSFUL <i class="fa fa-check"></i>');
                        setTimeout(function(){
                            $submit_button.removeAttr('disabled').html(backup_button);
                        },2000)
                    }
                    else{
                        alert(result);
                        $submit_button.removeAttr('disabled').html(backup_button);
                    }
                }
            });
        })
    }

    OsContactSubmit();

});