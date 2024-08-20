let tabNumberElement = null;

chrome.runtime.onMessage.addListener((message) => {
  if (!tabNumberElement) {
    tabNumberElement = document.createElement('div');
    tabNumberElement.className = 'tab-number-overlay';
    document.body.appendChild(tabNumberElement);
  }
  tabNumberElement.textContent = message.tabNumber;
  tabNumberElement.style.display = 'block';

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Alt') {
      tabNumberElement.style.display = 'none';
    }
  });
});

