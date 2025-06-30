export function initProductTabs() {
  const tabsContainer = document.querySelector('.products__tabs');
  
  if (!tabsContainer) {
    console.warn('Products tabs container not found');
    return;
  }
  
  const tabs = tabsContainer.querySelectorAll('.products__tab');
  
  if (tabs.length === 0) {
    console.warn('No product tabs found');
    return;
  }
  
  console.log(`Found ${tabs.length} product tabs`);
  
  tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
  
  // Ensure there's an active tab on page load
  ensureActiveTab();
}

function handleTabClick(event) {
  const clickedTab = event.currentTarget;
  const tabId = clickedTab.dataset.tab;
  const tabsContainer = clickedTab.closest('.products__tabs');
  const tabsContent = document.querySelector('.products__content');
  
  console.log(`Tab clicked: ${tabId}`);
  
  if (!tabId || !tabsContainer || !tabsContent) {
    console.error('Missing required elements for product tabs');
    return;
  }
  
  // Remove active class from all tabs
  const allTabs = tabsContainer.querySelectorAll('.products__tab');
  allTabs.forEach(tab => {
    tab.classList.remove('products__tab--active');
  });
  
  // Add active class to clicked tab
  clickedTab.classList.add('products__tab--active');
  
  // Remove active class from all products
  const allProducts = tabsContent.querySelectorAll('.product');
  allProducts.forEach(product => {
    product.classList.remove('product--active');
  });
  
  // Add active class to corresponding product
  const activeProduct = document.getElementById(tabId);
  if (activeProduct) {
    activeProduct.classList.add('product--active');
    console.log(`Product activated: ${tabId}`);
  } else {
    console.error(`Product with id "${tabId}" not found`);
  }
}

function ensureActiveTab() {
  const tabsContainer = document.querySelector('.products__tabs');
  const tabsContent = document.querySelector('.products__content');
  
  if (!tabsContainer || !tabsContent) {
    return;
  }
  
  // Check if there's already an active tab
  const activeTab = tabsContainer.querySelector('.products__tab--active');
  
  // If not, activate the first tab
  if (!activeTab && tabsContainer.querySelector('.products__tab')) {
    const firstTab = tabsContainer.querySelector('.products__tab');
    const firstTabId = firstTab.dataset.tab;
    
    console.log(`No active tab found, activating first tab: ${firstTabId}`);
    
    // Activate first tab
    firstTab.classList.add('products__tab--active');
    
    // Activate first product
    const firstProduct = document.getElementById(firstTabId);
    if (firstProduct) {
      firstProduct.classList.add('product--active');
    } else {
      console.error(`Product with id "${firstTabId}" not found`);
    }
  }
} 