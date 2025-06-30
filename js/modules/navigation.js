

export function initNavigation() {
  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const mobileNavHTML = createMobileNav();
  
  
  if (!document.querySelector('.mobile-nav')) {
    document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
  }
  
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
  
  
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      
      const targetId = this.getAttribute('href');
      
      
      if (targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          
          if (burger && burger.classList.contains('active')) {
            burger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
          
          
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  
  const mobileCTA = document.querySelector('.mobile-nav__cta');
  if (mobileCTA) {
    mobileCTA.addEventListener('click', () => {
      
      burger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      
      const modal = document.getElementById('modal');
      if (modal) {
        modal.classList.add('active');
      }
    });
  }
  
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

function createMobileNav() {
  return `
    <div class="mobile-nav">
      <ul class="mobile-nav__list">
        <li class="mobile-nav__item"><a href="#about" class="mobile-nav__link">О компании</a></li>
        <li class="mobile-nav__item"><a href="#products" class="mobile-nav__link">Продукция</a></li>
        <li class="mobile-nav__item"><a href="#advantages" class="mobile-nav__link">Преимущества</a></li>
        <li class="mobile-nav__item"><a href="#clients" class="mobile-nav__link">Клиенты</a></li>
        <li class="mobile-nav__item"><a href="#contacts" class="mobile-nav__link">Контакты</a></li>
      </ul>
      
      <div class="mobile-nav__contacts">
        <div class="mobile-nav__contact-item">
          <span class="mobile-nav__contact-label">Телефон:</span>
          <a href="tel:+74959999999" class="mobile-nav__contact-value">+7 (495) 999-99-99</a>
        </div>
        <div class="mobile-nav__contact-item">
          <span class="mobile-nav__contact-label">Email:</span>
          <a href="mailto:info@ztz.ru" class="mobile-nav__contact-value">info@ztz.ru</a>
        </div>
      </div>
      
      <button class="mobile-nav__cta button button--primary">Оставить заявку</button>
    </div>
  `;
} 