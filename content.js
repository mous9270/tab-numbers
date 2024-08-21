let numberDiv;

function createNumberDiv() {
  if (!numberDiv) {
    numberDiv = document.createElement('div');
    numberDiv.style.cssText = `
      position: fixed;
      top: 5px;
      left: 5px;
      background-color: #000;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 16px;
      z-index: 9999;
      display: none;
    `;
    document.body.appendChild(numberDiv);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateNumber") {
    createNumberDiv();
    numberDiv.textContent = request.number;
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Alt') {
    createNumberDiv();
    numberDiv.style.display = 'block';
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'Alt') {
    if (numberDiv) {
      numberDiv.style.display = 'none';
    }
  }
});

// Ensure the div is created even if the tab was opened before the extension was installed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createNumberDiv);
} else {
  createNumberDiv();
}
