let port;

function updateTabNumbers() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (port) {
      port.postMessage({
        action: "updateTabNumbers",
        tabs: tabs
      });
    }
  });
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'toggle-numbers') {
    updateTabNumbers();
  }
});

chrome.runtime.onConnect.addListener(function(portReceived) {
  port = portReceived;
  port.onDisconnect.addListener(function() {
    port = null;
  });
});
