let tabNumberElement = null;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Alt') {
    chrome.runtime.sendMessage({ action: 'showTabNumbers' });
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Alt' && tabNumberElement) {
    tabNumberElement.style.display = 'none';
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.tabNumber) {
    if (!tabNumberElement) {
      tabNumberElement = document.createElement('div');
      tabNumberElement.className = 'tab-number-overlay';
      document.body.appendChild(tabNumberElement);
    }
    tabNumberElement.textContent = message.tabNumber;
    tabNumberElement.style.display = 'block';
  }
});

