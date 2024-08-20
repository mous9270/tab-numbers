chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab, index) => {
      chrome.tabs.sendMessage(tab.id, { tabNumber: index + 1 });
    });
  });
});

