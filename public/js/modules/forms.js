export function initForms() {
  
  const contactForm = document.getElementById('contactForm');
  const modalForm = document.getElementById('modalForm');
  
  
  if (contactForm) {
    setupFormValidation(contactForm);
  }
  
  
  if (modalForm) {
    setupFormValidation(modalForm);
  }
}

function setupFormValidation(form) {
  
  form.addEventListener('submit', handleSubmit);
  
  
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
  });
}

function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const formElements = form.elements;
  let isValid = true;
  
  
  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const isInputValid = validateInput(element);
      isValid = isValid && isInputValid;
    }
  }
  
  
  if (isValid) {
    submitForm(form, formData);
  }
}

function validateInput(input) {
  const value = input.value.trim();
  const type = input.type;
  const isRequired = input.hasAttribute('required');
  
  
  const errorContainer = input.nextElementSibling;
  
  
  if (!isRequired && value === '') {
    hideError(errorContainer);
    return true;
  }
  
  
  if (isRequired && value === '') {
    showError(errorContainer, 'Это поле обязательно для заполнения');
    return false;
  }
  
  
  switch (type) {
    case 'email':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showError(errorContainer, 'Пожалуйста, введите корректный email');
        return false;
      }
      break;
      
    case 'tel':
      const phonePattern = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      if (!phonePattern.test(value)) {
        showError(errorContainer, 'Пожалуйста, введите корректный телефон');
        return false;
      }
      break;
      
    case 'checkbox':
      if (input.name === 'agreement' && !input.checked) {
        showError(errorContainer, 'Необходимо принять условия');
        return false;
      }
      break;
  }
  
  
  hideError(errorContainer);
  return true;
}

function showError(errorContainer, message) {
  if (errorContainer && errorContainer.classList.contains('form__error')) {
    errorContainer.textContent = message;
    errorContainer.classList.add('active');
  }
}

function hideError(errorContainer) {
  if (errorContainer && errorContainer.classList.contains('form__error')) {
    errorContainer.textContent = '';
    errorContainer.classList.remove('active');
  }
}

function submitForm(form, formData) {
  
  const submitButton = form.querySelector('[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Отправляем...';
  submitButton.disabled = true;
  
  
  const data = Object.fromEntries(formData.entries());
  
  
  
  setTimeout(() => {
    
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
    
    
    form.reset();
    
    
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
      successMessage.classList.add('active');
    }
    
    
    const modal = form.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }, 1000);
  
  

} 