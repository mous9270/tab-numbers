function updateTabNumbers() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.forEach((tab, index) => {
      chrome.tabs.sendMessage(tab.id, {action: "updateNumber", number: index + 1})
        .catch(error => {
          console.log(`Couldn't send message to tab ${tab.id}. This is normal for new tabs or special Chrome pages.`);
        });
    });
  });
}

// Update numbers when tabs change
chrome.tabs.onActivated.addListener(updateTabNumbers);
chrome.tabs.onCreated.addListener(updateTabNumbers);
chrome.tabs.onRemoved.addListener(updateTabNumbers);
chrome.tabs.onMoved.addListener(updateTabNumbers);

// Initial update
updateTabNumbers();
