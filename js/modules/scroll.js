

export function initScrollAnimations() {
  
  initSmoothScroll();
  
  
  initScrollFadeIn();
}

function initSmoothScroll() {
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      
      event.preventDefault();
      
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollFadeIn() {
  
  const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
  
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  
  animateElements.forEach(element => {
    
    element.classList.remove('animated');
    
    
    observer.observe(element);
  });
  
  
  document.querySelectorAll('[data-animation]').forEach(element => {
    const animation = element.dataset.animation;
    const delay = element.dataset.delay || 0;
    
    element.classList.add(animation);
    element.style.animationDelay = `${delay}s`;
  });
}

function createStaggeredAnimations(elements, delay = 0.1, increment = 0.1) {
  elements.forEach((element, index) => {
    const staggerDelay = delay + (index * increment);
    element.style.animationDelay = `${staggerDelay}s`;
  });
} 