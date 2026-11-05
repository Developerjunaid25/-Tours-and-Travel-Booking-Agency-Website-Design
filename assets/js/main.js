
(function ($) {
    "use strict";


    /*======================================
        Preloader activation
    ========================================*/

    var $grid = $(".masonry-layout");
    var iso;

    function initMasonry() {
        if ($grid.length) {
            $grid.imagesLoaded(function () {
                iso = $grid.isotope({
                    itemSelector: ".masonry-item",
                    percentPosition: true,
                    masonry: {
                        columnWidth: ".grid-sizer",
                        gutter: 0
                    }
                });
            });
        }
    }


    function destroyMasonry() {
        if (iso) {
            $grid.isotope("destroy");
            iso = null;
        }
    }

    function handleMasonry() {
        if (window.innerWidth >= 1200) {
            if (!iso) {
                initMasonry();
            }
        } else {
            destroyMasonry();
        }
    }

    if ($('#myTable').length) {
        $('#myTable').DataTable();
    }

    $(function () {

        $("#price-slider").slider({
            range: "min",
            min: 0,
            max: 1200,
            value: 700,

            create: function () {
                $("#price-text").text(
                    "$0 - " + $(this).slider("value")
                );
            },

            slide: function (event, ui) {
                $("#price-text").text("$0 - " + ui.value);
            }
        });

    });

    // Preloader 
    var innerBars = document.querySelectorAll(".inner-bar");

    function animateBars() {
        if (!innerBars.length) return;

        let increment = 0;

        function step() {
            for (let i = 0; i < 2 && innerBars[i + increment]; i++) {
                let randomWidth = Math.floor(Math.random() * 101);
                gsap.to(innerBars[i + increment], { width: randomWidth + "%", duration: 0.5, ease: "none" });
            }

            setTimeout(() => {
                for (let i = 0; i < 2 && innerBars[i + increment]; i++) {
                    gsap.to(innerBars[i + increment], { width: "100%", duration: 0.5, ease: "none" });
                }
                increment += 2;

                if (increment < innerBars.length) {
                    step();
                } else {
                    gsap.timeline()
                        .to(".preloader", { "--preloader-clip": "100%", duration: 0.8, ease: "none", delay: 0.8 })
                        .set(".preloader", { display: "none" });

                    // Only animate text if it exists
                    let textChars = gsap.utils.toArray(".text-animation-effect .char");
                    if (textChars.length) {
                        gsap.from(textChars, { duration: 1.5, x: 50, autoAlpha: 0, stagger: 0.1 });
                    }
                }
            }, 200);
        }

        step();
    }

    $(window).on("load", function () {
        handleMasonry();
        animateBars();

        setTimeout(function () {
            $(".preloader").remove();
        }, 3000);
    });

    // Zoom Effect
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector(".zoom-container");
        const img = document.querySelector("#product-image");

        if (!container || !img) return; // exit if elements not found
        if (typeof Drift === "undefined") {
            console.error("Drift library is not loaded.");
            return;
        }

        // Initialize Drift and custom zoom
        new Drift(img, {
            paneContainer: container,
            inlinePane: true,
            inlineOffsetY: 0,
            containInline: true,
            hoverBoundingBox: true
        });

        const handleMouseMove = (e) => {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
        };

        const handleMouseEnter = () => img.style.transform = "scale(1.5)";
        const handleMouseLeave = () => img.style.transform = "scale(1)";

        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseenter", handleMouseEnter);
        img.addEventListener("mouseleave", handleMouseLeave);
    });


    $(document).on("click", ".review-star i", function () {
        let index = $(this).index();

        $(this).parent().children("i").each(function (i) {
            if (i <= index) {
                $(this).removeClass("fa-regular").addClass("fa-solid");
            } else {
                $(this).removeClass("fa-solid").addClass("fa-regular");
            }
        });
    });

    //>> Mouse Cursor Start <<//
    const cursor = document.getElementById("custom-cursor");

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        if (
            e.target.closest(".drag-cursor-area") &&
            !e.target.closest("a, button, input, textarea, select, .normal-cursor")
        ) {
            cursor.classList.add("drag");
        } else {
            cursor.classList.remove("drag");
        }

    });



    $(function () {

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            $('body').addClass('firefox');
        }

        var header = $(".header"),
            stickyHeader = $(".primary-header");

        function menuSticky(w) {
            /**
             * A function to make the menu sticky when the window matches the media query.
             * @param {MediaQueryList} w - The media query list.
             * @example
             * menuSticky(window.matchMedia("(min-width: 768px)"));
             */
            if (w.matches) {

                $(window).off("scroll.menuSticky").on("scroll.menuSticky", function () {
                    var scroll = $(window).scrollTop();
                    if (scroll >= 110) {
                        stickyHeader.addClass("fixed");
                    } else {
                        stickyHeader.removeClass("fixed");
                    }
                });
                if ($(".header").length > 0) {
                    var headerHeight = document.querySelector(".header"),
                        setHeaderHeight = headerHeight.offsetHeight;
                    header.each(function () {
                        $(this).css({
                            'height': setHeaderHeight + 'px'
                        });
                    });
                }
            }
        }

        var minWidth = window.matchMedia("(min-width: 992px)");
        if (header.hasClass("sticky-active")) {
            menuSticky(minWidth);
        }

        //Mobile Menu Js
        $(".mobile-menu-items").meanmenu({
            meanMenuContainer: ".side-menu-wrap",
            meanScreenWidth: "9999",
            meanMenuCloseSize: "30px",
            meanRemoveAttrs: true,
            meanExpand: ['<i class="fa-solid fa-caret-down"></i>'],
        });

        // Mobile Sidemenu
        $(".mobile-side-menu-toggle").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
        });

        $(".mobile-side-menu-close, .mobile-side-menu-overlay").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass("is-open");
        });


        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");

            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("#popup-search-box").toggleClass("toggled");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });

            $("#popup-search-box, body").on("click", function () {
                $("#popup-search-box").removeClass("toggled");
            });
        });

        // Popup Sidebox
        function sideBox() {
            $("body").removeClass("open-sidebar");
            $(document).on("click", ".sidebar-trigger", function (e) {
                e.preventDefault();
                $("body").toggleClass("open-sidebar");
            });
            $(document).on("click", ".sidebar-trigger.close, #sidebar-overlay", function (e) {
                e.preventDefault();
                $("body.open-sidebar").removeClass("open-sidebar");
            });
        }

        sideBox();

        // Popular Causes Progress Bar
        if ($(".count-bar").length) {
            $(".count-bar").appear(
                function () {
                    var el = $(this);
                    var percent = el.data("percent");
                    $(el).css("width", percent).addClass("counted");
                }, {
                accY: -50
            }
            );
        }


        //Fact Counter + Text Count
        if ($(".count-box").length) {
            $(".count-box").appear(
                function () {
                    var $t = $(this),
                        n = $t.find(".count-text").attr("data-stop"),
                        r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                    if (!$t.hasClass("counted")) {
                        $t.addClass("counted");
                        $({
                            countNum: $t.find(".count-text").text()
                        }).animate({
                            countNum: n
                        }, {
                            duration: r,
                            easing: "linear",
                            step: function () {
                                $t.find(".count-text").text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $t.find(".count-text").text(this.countNum);
                            }
                        });
                    }
                }, {
                accY: 0
            }
            );
        }


        // Venobox Video
        new VenoBox({
            selector: ".video-popup, .img-popup",
            bgcolor: "transparent",
            numeration: true,
            infinigall: true,
            spinner: "plane",
        });

        // Data Background
        $("[data-background]").each(function () {
            $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
        });


        /* Odometer */
        $(".odometer").waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            },
            {
                offset: "80%",
                triggerOnce: true,
            }
        );

        // Nice Select Js
        $("select").niceSelect();


        $('.quantity-box').each(function () {
            var $box = $(this);
            var $input = $box.find('input');
            var $add = $box.find('.add');
            var $sub = $box.find('.sub');

            // Increment
            $add.on('click', function () {
                var currentVal = parseInt($input.val()) || 0;
                $input.val(currentVal + 1);
            });

            // Decrement
            $sub.on('click', function () {
                var currentVal = parseInt($input.val()) || 0;
                if (currentVal > 1) { // minimum value = 1
                    $input.val(currentVal - 1);
                }
            });

            // Allow only numbers
            $input.on('input', function () {
                var val = $input.val().replace(/[^0-9]/g, '');
                $input.val(val === '' ? 1 : val);
            });
        });


        // Project Carousel
        var swiperProject = new Swiper(".project-carousel", {
            slidesPerView: 1.5,
            spaceBetween: 32,
            loop: true,
            autoplay: true,
            grabcursor: true,
            centeredSlides: true,
            speed: 600,
            pagination: {
                el: ".tripzo-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1.2,
                },
                992: {
                    slidesPerView: 1.6,
                },
                1200: {
                    slidesPerView: 2.19,
                }
            },
        });


        // Detination Carousel
        var swiperDesti = new Swiper(".desti-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2.8,
                },
                1299: {
                    slidesPerView: 3.27,
                },
            },
        });


        var swiperDesti = new Swiper(".desti-carousel-2", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            initialSlide: 1,
            loop: true,
            speed: 800,
            autoplay: true,
            coverflowEffect: {
                rotate: 0,         /* Keep cards straight without 3D rotation */
                stretch: 80,       /* Overlap adjacent slides */
                depth: 180,        /* Push background slides back */
                modifier: 1.29,
                slideShadows: false,
            },
        });



        // Detination Carousel
        var swiperDesti = new Swiper(".desti-carousel-4", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1.5,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
            },
        });
        // Detination Carousel
        var swiperPackage = new Swiper(".package-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1.5,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
            },
        });
        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            centeredSlides: true,
            speed: 1000,
            pagination: {
                el: ".tripzo-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
                1299: {
                    slidesPerView: 3,
                },
                1399: {
                    slidesPerView: 3,
                },
                1599: {
                    slidesPerView: 3,
                },
                1699: {
                    spaceBetween: 40,
                    slidesPerView: 3,
                },
            },
        });

        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            pagination: {
                el: ".tripzo-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1.6,
                },
                1199: {
                    slidesPerView: 1.9,
                },
                1299: {
                    slidesPerView: 2,
                },
            },
        });


        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel-3", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
                1299: {
                    slidesPerView: 3,
                },
                1399: {
                    slidesPerView: 3,
                },
                1599: {
                    slidesPerView: 3,
                },
                1699: {
                    slidesPerView: 2.5,
                },
            },
        });


        // Blog Carousel
        var swiperBlog = new Swiper(".blog-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
            },
        });

        //>> Brand Slider Start <<//
        const brandSlider = new Swiper(".brand-carousel", {
            spaceBetween: 16,
            loop: true,
            autoplay: true,
            speed: 600,
            navigation: {
                nextEl: '.brand-nav .swiper-next',
                prevEl: '.brand-nav .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                475: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 8,
                },
            },
        });

        // Shop Carousel
        var swiperProject4 = new Swiper(".shop-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 600,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });

        $(window).on("load", function () {
            $(".carouselTicker").each(function () {
                $(this).carouselTicker({
                    direction: "prev"
                });
            });
        });

        //Running Animated Text
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }


        // Page Scroll Percentage
        function scrollTopPercentage() {
            const scrollPercentage = () => {
                const scrollTopPos = document.documentElement.scrollTop;
                const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
                const scrollElementWrap = $("#scroll-percentage");

                scrollElementWrap.css("background", `conic-gradient( var(--cp-color-theme-primary) ${scrollValue}%, var(--cp-color-bg-2) ${scrollValue}%)`);

                // ScrollProgress
                if (scrollTopPos > 100) {
                    scrollElementWrap.addClass("active");
                } else {
                    scrollElementWrap.removeClass("active");
                }

                if (scrollValue < 96) {
                    $("#scroll-percentage-value").text(`${scrollValue}%`);
                } else {
                    $("#scroll-percentage-value").html('<i class="fa-sharp fa-regular fa-arrow-up-long"></i>');
                }
            }
            $(window).on("scroll", scrollPercentage)

            // Back to Top
            function scrollToTop() {
                document.documentElement.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            $("#scroll-percentage").on("click", scrollToTop);
        }

        scrollTopPercentage();
    });

$(document).on('mouseenter', '.active-item', function () {
    $(this).siblings('.active-item').removeClass('active');
    $(this).addClass('active');
});

    $(document).on("click", ".scroll-btn", function () {
        var sectionTarget = $(this).data("target");
        gsap.to(window, { duration: 1, scrollTo: { y: sectionTarget, offsetY: 70 } });
    });

})(jQuery);
