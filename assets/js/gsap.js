(function ($) {
    "use strict";

    var device_width = window.innerWidth;

    gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

    if ($(".text-animation-effect").length) {
        let splitText = new SplitType(".text-animation-effect", { types: 'chars' });

        if ($(".text-animation-effect .char").length) {
            gsap.from(".text-animation-effect .char", {
                duration: 1,
                x: 50,
                autoAlpha: 0,
                stagger: 0.1
            });
        }
    }

    if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {

        gsap.registerPlugin(ScrollTrigger, SplitText);

        // ===== tz-sub-tilte =====
        $(".tz-sub-tilte").each(function (index, el) {
            if (!el || !$(el).length) return;

            let split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });

            if (split && split.chars && split.chars.length) {
                gsap.set(split.chars, { x: 20, opacity: 0 }); // prevent null animation

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            }
        });

        // ===== tz-itm-title =====
        $('.tz-itm-title').each(function (index, el) {

            if (!el || !$(el).length) return;

            let split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });

            if (split && split.chars && split.chars.length) {

                gsap.set(split.chars, {
                    opacity: 0.3,
                    x: -7
                });

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            }
        });

        ScrollTrigger.refresh();
    }

    // Prallax Img
    if ($('.tp-full-img-wrap').length > 0) {
        ScrollTrigger.create({
            trigger: ".tp-full-img-wrap",
            start: "top 65",
            end: "bottom 0%",
            pin: ".tp-full-img",
            pinSpacing: false,
        });
    }


    // Image Reveal
    let revealContainers = gsap.utils.toArray(".reveal");

    revealContainers.forEach(container => {

        if (!container) return;

        let image = container.querySelector("img");
        if (!image) return;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: "restart none none reset"
            }
        });

        tl.set(container, { autoAlpha: 1 })
            .from(container, {
                xPercent: -100,
                duration: 1.5,
                ease: "power2.out"
            })
            .from(image, {
                xPercent: 100,
                scale: 1.3,
                duration: 1.5,
                delay: -1.5,
                ease: "power2.out"
            });
    });


    // ================= SIMPLE IMAGE SCALE REVEAL =================

    const images = document.querySelectorAll(".img-reveal");

    images.forEach(image => {

        if (!image) return;

        const img = image.querySelector("img");
        if (!img) return;

        gsap.set(image, { visibility: "visible" });

        const tl = gsap.timeline({ paused: true });

        // ✅ ONLY SCALE ANIMATION
        tl.from(img, {
            duration: 1.4,
            scale: 1.4,
            ease: "power2.inOut"
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tl.play();
                } else {
                    tl.progress(0).pause();
                }
            });
        }, { threshold: 0 });

        io.observe(image);
    });

    // Scroll Animation

    let typeSplit = new SplitType("[data-text-animation]", {
        types: "lines,words, chars",
        className: "line",
    });
    var text_animations = document.querySelectorAll(
        "[data-text-animation]"
    );

    function createScrollTrigger(triggerElement, timeline) {
        // Play tl when scrolled into view (60% from top of screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 80%",
            onEnter: () => timeline.play(),
            toggleClass: { targets: triggerElement, className: "active" }
        });
    }

    text_animations.forEach((animation) => {
        let type = "slide-up",
            duration = 0.75,
            offset = 80,
            stagger = 0.6,
            delay = 0,
            scroll = 1,
            split = "line",
            ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-stagger")) {
            stagger = animation.getAttribute("data-stagger");
        }
        if (animation.getAttribute("data-duration")) {
            duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-text-animation")) {
            type = animation.getAttribute("data-text-animation");
        }
        if (animation.getAttribute("data-delay")) {
            delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
            ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
            scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-offset")) {
            offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-split")) {
            split = animation.getAttribute("data-split");
        }
        if (scroll == 1) {
            if (type == "slide-up") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: offset,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-down") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: -offset,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "rotate-in") {
                let tl = gsap.timeline({ paused: true });
                tl.set(animation.querySelectorAll(`.${split}`), {
                    transformPerspective: 400,
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    rotationX: -offset,
                    duration,
                    ease,
                    force3D: true,
                    opacity: 0,
                    transformOrigin: "top center -50",
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-left") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: -offset,
                    duration,
                    opacity: 0,
                    ease,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: offset,
                    duration,
                    opacity: 0,
                    ease,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    x: 100,
                    autoAlpha: 0,
                    duration,
                    stagger: stagger,
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-bottom-line") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    autoAlpha: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
                    delay: 0.3,
                    duration,
                    stagger: stagger,
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-random") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger, from: "random" },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "scrub") {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: animation,
                        start: "top 90%",
                        end: "top center",
                        scrub: true,
                    },
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0.2,
                    duration,
                    ease,
                    stagger: { amount: stagger },
                });
            }

            // Avoid flash of unstyled content
            gsap.set("[data-text-animation]", { opacity: 1 });
        } else {
            if (type == "slide-up") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: offset,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "slide-down") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: -offset,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "rotate-in") {
                let tl = gsap.timeline({ paused: true });
                tl.set(animation.querySelectorAll(`.${split}`), {
                    transformPerspective: 400,
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    rotationX: -offset,
                    duration,
                    ease,
                    force3D: true,
                    opacity: 0,
                    transformOrigin: "top center -50",
                });
            }
            if (type == "slide-from-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: offset,
                    duration,
                    opacity: 0,
                    ease,
                });
            }
            if (type == "fade-in") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "fade-in-random") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger, from: "random" },
                });
            }
            if (type == "scrub") {
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0.2,
                    duration,
                    ease,
                });
            }
        }
    });


    if ($(".fade-wrapper").length > 0) {
        $(".fade-wrapper").each(function () {
            var section = $(this);
            var fadeItems = section.find(".fade-top");

            fadeItems.each(function (index, element) {
                var delay = index * 0.10;

                gsap.set(element, {
                    opacity: 0,
                    y: 100,
                });

                ScrollTrigger.create({
                    trigger: element,
                    start: "top 100%",
                    end: "bottom 20%",
                    scrub: 0.5,
                    onEnter: function () {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            delay: delay,
                        });
                    },
                    once: true,
                });
            });
        });
    }

    let fadeArray_items = document.querySelectorAll(".slide-anim");
    if (fadeArray_items.length > 0) {
        const fadeArray = gsap.utils.toArray(".slide-anim")
        fadeArray.forEach((item, i) => {
            var fade_direction = "bottom"
            var onscroll_value = 1
            var duration_value = 1.15
            var fade_offset = 50
            var delay_value = 0.15
            var ease_value = "power2.out"
            if (item.getAttribute("data-offset")) {
                fade_offset = item.getAttribute("data-offset");
            }
            if (item.getAttribute("data-duration")) {
                duration_value = item.getAttribute("data-duration");
            }
            if (item.getAttribute("data-direction")) {
                fade_direction = item.getAttribute("data-direction");
            }
            if (item.getAttribute("data-on-scroll")) {
                onscroll_value = item.getAttribute("data-on-scroll");
            }
            if (item.getAttribute("data-delay")) {
                delay_value = item.getAttribute("data-delay");
            }
            if (item.getAttribute("data-ease")) {
                ease_value = item.getAttribute("data-ease");
            }
            let animation_settings = {
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            }
            if (fade_direction == "top") {
                animation_settings['y'] = -fade_offset
            }
            if (fade_direction == "left") {
                animation_settings['x'] = -fade_offset;
            }
            if (fade_direction == "bottom") {
                animation_settings['y'] = fade_offset;
            }
            if (fade_direction == "right") {
                animation_settings['x'] = fade_offset;
            }
            if (onscroll_value == 1) {
                animation_settings['scrollTrigger'] = {
                    trigger: item,
                    start: 'top 85%',
                }
            }
            gsap.from(item, animation_settings);
        })
    }


    // scale animation 
    var scale = document.querySelectorAll(".scale");
    var image = document.querySelectorAll(".scale img");
    scale.forEach((item) => {
        gsap.to(item, {
            scale: 1,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: "bottom top",
                toggleActions: 'play reverse play reverse'
            }
        });
    });
    image.forEach((image) => {
        gsap.set(image, {
            scale: 1.3,
        });
        gsap.to(image, {
            scale: 1,
            duration: 1,
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: "bottom top",
                toggleActions: 'play reverse play reverse'
            }
        });
    })

    // 19 Case panel animation //
    let ca = gsap.matchMedia();
    ca.add("(min-width: 992px)", () => {
        let tl = gsap.timeline();
        let projectpanels = document.querySelectorAll('.tp-case-panel');
        let baseOffset = 110;
        let offsetIncrement = 0;
        projectpanels.forEach((section, index) => {
            let topOffset = baseOffset + (index * offsetIncrement);
            tl.to(section, {
                scrollTrigger: {
                    trigger: section,
                    pin: section,
                    scrub: 1,
                    start: `top ${topOffset}px`,
                    end: "bottom 90%",
                    endTrigger: '.tp-case-pin',
                    pinSpacing: false,
                    markers: false,
                },
            });
        });
    });


    var pin_fixed = document.querySelector('.pin-element');
    if (pin_fixed && device_width > 991) {
        gsap.to(".pin-element", {
            scrollTrigger: {
                trigger: ".pin-area",
                pin: ".pin-element",
                start: "top 140",
                end: "bottom 81.2%",
                pinSpacing: false,
            }
        });
    }


    // Function definition
    function initTitleAnimation(selector = '.explore-title', delayInSeconds = 2) {
        const titles = gsap.utils.toArray(selector);
        if (!titles.length) return; // Prevents errors on pages without this selector

        titles.forEach((title) => {
            // Prevent re-splitting if initialized multiple times
            if (title.classList.contains('is-split')) return;
            title.classList.add('is-split');

            // Split text into spans
            const text = title.textContent.trim();
            title.innerHTML = text
                .split('')
                .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');

            // Query characters ONLY inside this specific title
            const chars = title.querySelectorAll('.char');

            // Create an independent timeline for each title instance
            const tl = gsap.timeline({ delay: delayInSeconds });

            // Entrance animation
            tl.from(chars, {
                y: -100,
                opacity: 0,
                duration: 2,
                stagger: 0.1,
                ease: 'back.out(4)'
            });

            // Endless sway animation
            tl.to(chars, {
                x: '+=8',
                duration: 1.5,
                ease: 'sine.easeInOut',
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.08,
                    from: 'center'
                }
            });
        });
    }


    function initExploreTitle2Animation(selector = '.explore-title-2', delayInSeconds = 2) {
        const titles = gsap.utils.toArray(selector);
        if (!titles.length) return;

        titles.forEach((title) => {
            // Custom attribute check to avoid 'is-split' conflicts
            if (title.dataset.title2Animated === "true") return;
            title.dataset.title2Animated = "true";

            // Query inner characters or generate new .char-2 spans
            let chars = title.querySelectorAll('.char-2');

            if (!chars.length) {
                const text = title.textContent.trim();
                title.innerHTML = text
                    .split('')
                    .map(char => `<span class="char-2">${char === ' ' ? '&nbsp;' : char}</span>`)
                    .join('');
                chars = title.querySelectorAll('.char-2');
            }

            const tl = gsap.timeline({ delay: delayInSeconds });

            // 1. Entrance: Rises up from behind mountain peaks with blur dissipation
            tl.from(chars, {
                y: 90,
                opacity: 0,
                filter: 'blur(16px)',
                scale: 0.9,
                duration: 1.8,
                stagger: {
                    each: 0.08,
                    from: 'edges' // Reveals outer letters first
                },
                ease: 'power3.out'
            });

            // 2. Idle Loop: Organic random floating
            tl.to(chars, {
                y: '-=10',
                duration: 3.5,
                ease: 'sine.easeInOut',
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.12,
                    from: 'random'
                }
            });
        });
    }

    // Execute on DOM ready
    document.addEventListener("DOMContentLoaded", () => {
        initTitleAnimation();
        initExploreTitle2Animation();
    });


})(jQuery);