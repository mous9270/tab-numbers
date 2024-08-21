chrome.commands.onCommand.addListener((command) => {
  if (command === "show-tab-list") {
    chrome.tabs.query({}, (tabs) => {
      const tabList = tabs.map((tab, index) => `${index + 1}: ${tab.title}`);
      chrome.runtime.sendMessage({ type: "showTabList", tabList });
    });
  }
});

