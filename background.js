chrome.runtime.onInstalled.addListener(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab, index) => {
          chrome.tabs.sendMessage(tab.id, { tabNumber: index + 1 });
        });
      });
    }
  });
});

