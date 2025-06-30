import { initNavigation } from './modules/navigation.js';
import { initProductTabs } from './modules/product-tabs.js';
import { initForms } from './modules/forms.js';
import { initModals } from './modules/modals.js';
import { initScrollAnimations } from './modules/scroll.js';
import { initAnimations } from './modules/animations.js';

function checkGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return false;
  }
  return true;
}

function initApp() {
  initNavigation();
  initProductTabs();
  initForms();
  initModals();
  
  if (checkGSAP()) {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
      initScrollAnimations();
      initAnimations();
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, 100);
  }
  
  initMap();
}

document.addEventListener('DOMContentLoaded', initApp);

window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }
});

function initMap() {
  const mapElement = document.getElementById('map');
  
  if (!mapElement) {
    return;
  }
  
  try {
    const ztzLocation = [56.3029, 38.1299];
    
    const map = L.map(mapElement).setView(ztzLocation, 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    const marker = L.marker(ztzLocation).addTo(map);
    
    marker.bindPopup(`
      <div style="padding: 5px; max-width: 200px;">
        <h3 style="margin: 0 0 10px; font-size: 16px;">Загорский трубный завод</h3>
        <p style="margin: 0; font-size: 14px;">Производство труб большого диаметра</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Тел: +7 (495) 999-99-99</p>
      </div>
    `);
    
    setTimeout(() => {
      marker.openPopup();
    }, 1000);
    
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  } catch (error) {
    // Silent error handling
  }
} 