document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({}, (tabs) => {
    const tabList = tabs.map((tab, index) => `${index + 1}: ${tab.title}`);
    document.getElementById('tab-list').innerText = tabList.join('\n');
  });
});

