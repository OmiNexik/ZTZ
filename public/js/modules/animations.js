export function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        return;
    }

    gsap.defaults({
        ease: 'power2.out',
        duration: 0.8,
        overwrite: true
    });

    setTimeout(() => {
        animateHeader();
        animateHero();
        animateSections();
        animateProducts();
        animateAdvantages();
        animateClients();
        animateFooter();
        init3DEffects();

        ScrollTrigger.refresh(true);
    }, 100);
}

function animateHeader() {
    const header = document.querySelector('.header');

    if (!header) {
        return;
    }

    gsap.fromTo(header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, clearProps: "all" }
    );

    ScrollTrigger.create({
        start: 'top -10',
        end: 99999,
        toggleClass: { className: 'header--scrolled', targets: header }
    });
}

function animateHero() {
    const heroTitle = document.querySelector('.hero__title');
    const heroDescription = document.querySelector('.hero__description');
    const heroCta = document.querySelector('.hero__cta');
    const heroImage = document.querySelector('.hero__image');

    if (!heroTitle || !heroDescription || !heroCta || !heroImage) {
        return;
    }

    gsap.set([heroTitle, heroDescription, heroCta], { opacity: 0, x: -50 });
    gsap.set(heroImage, { opacity: 0, x: 50, rotation: 5 });

    const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    heroTl
        .to(heroTitle, { opacity: 1, x: 0, duration: 0.8 })
        .to(heroDescription, { opacity: 1, x: 0, duration: 0.8 }, '-=0.5')
        .to(heroCta, { opacity: 1, x: 0, duration: 0.8 }, '-=0.5')
        .to(heroImage, {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            clearProps: "rotation,x"
        }, '-=0.7');
}

function animateSections() {
    const sectionTitles = document.querySelectorAll('.section-title');

    if (sectionTitles.length) {
        sectionTitles.forEach(title => {
            gsap.set(title, { opacity: 0, y: 50 });

            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                clearProps: "y"
            });
        });
    }

    const aboutContent = document.querySelector('.about__content');
    const aboutStats = document.querySelectorAll('.about__stat-item');
    const aboutCertificates = document.querySelector('.about__certificates');
    const aboutGallery = document.querySelectorAll('.about__gallery-item');

    if (aboutContent) {
        gsap.set(aboutContent, { opacity: 0, y: 50 });

        gsap.to(aboutContent, {
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            clearProps: "y"
        });
    }

    if (aboutStats.length) {
        gsap.set(aboutStats, { opacity: 0, y: 30 });

        gsap.to(aboutStats, {
            scrollTrigger: {
                trigger: aboutStats[0],
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            clearProps: "y"
        });
    }

    if (aboutCertificates) {
        gsap.set(aboutCertificates, { opacity: 0, y: 50 });

        gsap.to(aboutCertificates, {
            scrollTrigger: {
                trigger: aboutCertificates,
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            clearProps: "y"
        });
    }

    if (aboutGallery.length) {
        gsap.set(aboutGallery, { opacity: 0, y: 50 });

        gsap.to(aboutGallery, {
            scrollTrigger: {
                trigger: aboutGallery[0],
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            clearProps: "y"
        });
    }
}

function animateProducts() {
    const productTabs = document.querySelectorAll('.products__tab');
    const products = document.querySelectorAll('.product');

    if (productTabs.length) {
        gsap.set(productTabs, { opacity: 0, y: -30 });

        gsap.to(productTabs, {
            scrollTrigger: {
                trigger: productTabs[0].closest('.products__tabs'),
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            stagger: 0.1,
            clearProps: "y"
        });
    }

    if (products.length) {
        const activeProduct = document.querySelector('.product--active');
        if (activeProduct) {
            const productImage = activeProduct.querySelector('.product__image');
            const productInfo = activeProduct.querySelector('.product__info');

            if (productImage && productInfo) {
                gsap.set(productImage, { opacity: 0, x: -50 });
                gsap.set(productInfo, { opacity: 0, x: 50 });

                const productTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: activeProduct,
                        start: 'top 80%'
                    }
                });

                productTl
                    .to(productImage, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        clearProps: "x"
                    })
                    .to(productInfo, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        clearProps: "x"
                    }, '-=0.5');
            }
        }
    }

    document.querySelectorAll('.products__tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const targetId = this.getAttribute('data-tab');
            const targetProduct = document.getElementById(targetId);

            if (targetProduct) {
                const productImage = targetProduct.querySelector('.product__image');
                const productInfo = targetProduct.querySelector('.product__info');

                if (productImage && productInfo) {
                    gsap.killTweensOf([productImage, productInfo]);

                    gsap.set(productImage, { opacity: 0, x: -50 });
                    gsap.set(productInfo, { opacity: 0, x: 50 });

                    gsap.to(productImage, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        clearProps: "x"
                    });

                    gsap.to(productInfo, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.1,
                        clearProps: "x"
                    });
                }
            }
        });
    });
}

function animateAdvantages() {
    const advantages = document.querySelectorAll('.advantage');

    if (!advantages.length) {
        return;
    }

    gsap.set(advantages, { opacity: 0, y: 50 });

    gsap.to(advantages, {
        scrollTrigger: {
            trigger: advantages[0].closest('.advantages'),
            start: 'top 80%'
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.2)',
        clearProps: "y"
    });

    advantages.forEach((advantage, index) => {
        const icon = advantage.querySelector('.advantage__icon');

        if (icon) {
            gsap.to(icon, {
                scrollTrigger: {
                    trigger: advantage,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                rotation: 360,
                duration: 1.5,
                ease: 'elastic.out(1, 0.3)',
                delay: index * 0.1,
                clearProps: "rotation"
            });

            const randomTime = 1.5 + Math.random();
            gsap.to(icon, {
                y: '+=10',
                duration: randomTime,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.2
            });
        }
    });
}

function animateClients() {
    const clients = document.querySelectorAll('.client');

    if (!clients.length) {
        return;
    }

    gsap.set(clients, { opacity: 0, scale: 0.8 });

    gsap.to(clients, {
        scrollTrigger: {
            trigger: clients[0].closest('.clients'),
            start: 'top 80%'
        },
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        clearProps: "scale"
    });

    clients.forEach(client => {
        const logo = client.querySelector('.client__logo');
        if (logo) {
            client.addEventListener('mouseenter', () => {
                gsap.to(logo, { scale: 1.1, duration: 0.3 });
            });

            client.addEventListener('mouseleave', () => {
                gsap.to(logo, { scale: 1, duration: 0.3 });
            });
        }
    });
}

function animateFooter() {
    const footerSections = document.querySelectorAll('.footer__company, .footer__nav, .footer__contacts, .footer__requisites, .footer__map');

    if (!footerSections.length) {
        return;
    }

    gsap.set(footerSections, { opacity: 0, y: 30 });

    gsap.to(footerSections, {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%'
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        clearProps: "y"
    });

    const map = document.querySelector('#map');
    if (map) {
        gsap.set(map, { opacity: 0, scale: 0.9 });

        gsap.to(map, {
            scrollTrigger: {
                trigger: map,
                start: 'top 90%'
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
            clearProps: "scale"
        });
    }
}

function init3DEffects() {
    const productImages = document.querySelectorAll('.product__image');

    productImages.forEach(image => {
        image.classList.add('product__image--3d');

        gsap.set(image, { perspective: 1000 });

        image.addEventListener('mousemove', e => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 2;
            const yPercent = (y / rect.height - 0.5) * 2;

            gsap.to(image, {
                rotationY: xPercent * 10,
                rotationX: -yPercent * 10,
                duration: 0.5,
                ease: 'power1.out'
            });

            const img = image.querySelector('img');
            if (img) {
                gsap.to(img, {
                    x: xPercent * 15,
                    y: yPercent * 15,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            }
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(image, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });

            const img = image.querySelector('img');
            if (img) {
                gsap.to(img, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    });

    const advantageIcons = document.querySelectorAll('.advantage__icon');

    advantageIcons.forEach((icon, index) => {
        const randomTime = 1 + Math.random() * 2;

        gsap.killTweensOf(icon);

        gsap.to(icon, {
            y: '+=10',
            duration: randomTime,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1
        });
    });

    const buttons = document.querySelectorAll('.button--primary');

    buttons.forEach(button => {
        button.classList.add('button--glow');

        gsap.to(button, {
            boxShadow: '0 0 15px rgba(240, 76, 47, 0.7)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
} 