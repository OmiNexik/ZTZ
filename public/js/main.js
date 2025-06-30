
import { initNavigation } from './modules/navigation.js';
import { initProductTabs } from './modules/product-tabs.js';
import { initForms } from './modules/forms.js';
import { initModals } from './modules/modals.js';
import { initScrollAnimations } from './modules/scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  initProductTabs();
  
  initForms();
  
  initModals();
  
  initScrollAnimations();
});

window.initMap = function() {
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    const ztzLocation = { lat: 56.3029, lng: 38.1299 };
    
    const map = new google.maps.Map(mapElement, {
      center: ztzLocation,
      zoom: 15,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#c9c9c9" }]
        },
        {
          "featureType": "poi",
          "stylers": [{ "visibility": "off" }]
        }
      ]
    });
    
    // Добавляем маркер
    const marker = new google.maps.Marker({
      position: ztzLocation,
      map: map,
      title: "Загорский трубный завод",
      animation: google.maps.Animation.DROP
    });
    
    // Добавляем информационное окно
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; max-width: 200px;">
          <h3 style="margin: 0 0 10px; font-size: 16px;">Загорский трубный завод</h3>
          <p style="margin: 0; font-size: 14px;">Производство труб большого диаметра</p>
          <p style="margin: 5px 0 0; font-size: 14px;">Тел: +7 (495) 999-99-99</p>
        </div>
      `
    });
    
    // Открываем информационное окно при клике на маркер
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }
} 