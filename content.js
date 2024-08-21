let tabNumbersDiv;

function updateTabNumbers() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (!tabNumbersDiv) {
      tabNumbersDiv = document.createElement('div');
      tabNumbersDiv.style.cssText = `
        position: fixed;
        top: 5px;
        left: 5px;
        background-color: #000;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 9999;
        display: none;
      `;
      document.body.appendChild(tabNumbersDiv);
    }

    let tabNumbersHtml = '';
    tabs.forEach((tab, index) => {
      tabNumbersHtml += `<div>Tab ${index + 1}: ${tab.url}</div>`;
    });
    tabNumbersDiv.innerHTML = tabNumbersHtml;
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Alt' && tabNumbersDiv) {
    tabNumbersDiv.style.display = 'block';
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'Alt' && tabNumbersDiv) {
    tabNumbersDiv.style.display = 'none';
  }
});

// Ensure the div is created even if the tab was opened before the extension was installed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateTabNumbers);
} else {
  updateTabNumbers();
}
