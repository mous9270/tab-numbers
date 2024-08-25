chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTabs") {
    chrome.tabs.query({}, (tabs) => {
      const tabList = tabs.map((tab, index) => `${index + 1}: ${tab.title}`);
      chrome.tabs.sendMessage(sender.tab.id, {type: "showTabList", tabList});
    });
  } else if (message.type === "switchTab") {
    chrome.tabs.query({}, (tabs) => {
      if (tabs[message.index]) {
        chrome.tabs.update(tabs[message.index].id, {active: true});
      }
    });
  }
});
