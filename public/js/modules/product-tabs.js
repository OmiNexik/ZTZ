export function initProductTabs() {
  const tabsContainer = document.querySelector('.products__tabs');
  
  if (!tabsContainer) {
    return;
  }
  
  const tabs = tabsContainer.querySelectorAll('.products__tab');
  
  if (tabs.length === 0) {
    return;
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
  
  ensureActiveTab();
}

function handleTabClick(event) {
  const clickedTab = event.currentTarget;
  const tabId = clickedTab.dataset.tab;
  const tabsContainer = clickedTab.closest('.products__tabs');
  const tabsContent = document.querySelector('.products__content');
  
  if (!tabId || !tabsContainer || !tabsContent) {
    return;
  }
  
  // Remove active class from all tabs
  const allTabs = tabsContainer.querySelectorAll('.products__tab');
  allTabs.forEach(tab => {
    tab.classList.remove('products__tab--active');
  });
  
  clickedTab.classList.add('products__tab--active');
  
  const allProducts = tabsContent.querySelectorAll('.product');
  allProducts.forEach(product => {
    product.classList.remove('product--active');
  });
  
  const activeProduct = document.getElementById(tabId);
  if (activeProduct) {
    activeProduct.classList.add('product--active');
  }
}

function ensureActiveTab() {
  const tabsContainer = document.querySelector('.products__tabs');
  const tabsContent = document.querySelector('.products__content');
  
  if (!tabsContainer || !tabsContent) {
    return;
  }
  
  const activeTab = tabsContainer.querySelector('.products__tab--active');
  
  if (!activeTab && tabsContainer.querySelector('.products__tab')) {
    const firstTab = tabsContainer.querySelector('.products__tab');
    const firstTabId = firstTab.dataset.tab;
    
    firstTab.classList.add('products__tab--active');
    
    const firstProduct = document.getElementById(firstTabId);
    if (firstProduct) {
      firstProduct.classList.add('product--active');
    }
  }
} 