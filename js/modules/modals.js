

export function initModals() {
  
  const modal = document.getElementById('modal');
  
  
  const successMessage = document.getElementById('successMessage');
  
  
  if (modal) {
    
    const modalTriggers = document.querySelectorAll('[data-modal], .header__cta, .hero__cta .button--primary');
    
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        openModal(modal);
      });
    });
    
    
    const closeButton = modal.querySelector('.modal__close');
    
    
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
    }
    
    
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
    
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }
  
  
  if (successMessage) {
    
    const closeButtons = successMessage.querySelectorAll('.success-message__close, .success-message__button');
    
    
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        closeSuccessMessage(successMessage);
      });
    });
    
    
    successMessage.addEventListener('click', (event) => {
      if (event.target === successMessage) {
        closeSuccessMessage(successMessage);
      }
    });
    
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && successMessage.classList.contains('active')) {
        closeSuccessMessage(successMessage);
      }
    });
  }
  
  
  const specButtons = document.querySelectorAll('.product__cta');
  
  
  specButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      
      const productTitle = event.currentTarget.closest('.product').querySelector('.product__title').textContent;
      
      
      if (modal) {
        const modalTitle = modal.querySelector('.modal__title');
        if (modalTitle) {
          modalTitle.textContent = `Запросить спецификацию: ${productTitle}`;
        }
        
        
        openModal(modal);
      }
    });
  });
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  
  
  setTimeout(() => {
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function closeSuccessMessage(successMessage) {
  successMessage.classList.remove('active');
  document.body.classList.remove('modal-open');
} 