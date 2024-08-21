chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "showTabList") {
    const tabList = message.tabList.join("\n");
    alert(tabList);  // Display the tab list in an alert for simplicity
  }
});

