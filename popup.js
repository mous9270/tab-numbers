let port;

document.addEventListener('DOMContentLoaded', function() {
  port = chrome.runtime.connect({name: "tab-numberer"});
  port.onMessage.addListener(function(message) {
    if (message.action === "updateTabNumbers") {
      updateTabNumbers(message.tabs);
    }
  });
});

function updateTabNumbers(tabs) {
  const tabNumbersDiv = document.getElementById('tab-numbers');
  tabNumbersDiv.innerHTML = '';

  tabs.forEach((tab, index) => {
    const tabNumberDiv = document.createElement('div');
    tabNumberDiv.classList.add('tab-number');
    tabNumberDiv.textContent = index + 1;
    tabNumbersDiv.appendChild(tabNumberDiv);
  });
}
