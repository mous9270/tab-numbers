let tabListDiv = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "showTabList") {
    showTabList(message.tabList);
  }
});

function showTabList(tabList) {
  if (!tabListDiv) {
    tabListDiv = document.createElement('div');
    tabListDiv.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: white;
      border: 1px solid black;
      padding: 10px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      max-height: 80vh;
      overflow-y: auto;
    `;
    document.body.appendChild(tabListDiv);
  }
  
  tabListDiv.innerHTML = tabList.join('<br>');
  tabListDiv.style.display = 'block';

  document.addEventListener('keyup', handleKeyUp);
}

function handleKeyUp(event) {
  if (event.key === 'Alt') {
    tabListDiv.style.display = 'none';
    document.removeEventListener('keyup', handleKeyUp);
  } else if (event.key >= '1' && event.key <= '9') {
    const index = parseInt(event.key) - 1;
    chrome.runtime.sendMessage({type: "switchTab", index: index});
    tabListDiv.style.display = 'none';
    document.removeEventListener('keyup', handleKeyUp);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Alt') {
    chrome.runtime.sendMessage({type: "getTabs"});
  }
});
