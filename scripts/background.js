const mastodon = 'https://mastodon.coley.co/home'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(!tab.url) return;

  console.log(tab.url);
  const url = new URL(tab.url).origin;

  chrome.storage.local.get(["servers"]).then((result) => {
    if(changeInfo.status == "complete" && result.servers.map(s => s.url).includes(url)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["scripts/content-script.js"],
      });

      chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["styles/content-style.css"],
      });
    }
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const url = new URL(tab.url).origin;

  console.log(tab);

  var servers;
  chrome.storage.local.get(["servers"]).then((result) => {
    console.log(result.servers);

    servers = result.servers;

    var action = servers.map(s => s.url).includes(url) ? (
      // Remove server from list
      chrome.storage.local.set({
        // servers: servers.filter((server) => server !== url)
        servers: servers
      })
    ) : (
      // Add server to list
      chrome.storage.local.set({
        servers: [
          ...servers,
          {
            url: url,
            title: tab.title.split(' - ')[1]
          }
        ]
      })
    );

    action.then(result => {
      chrome.storage.local.get(["servers"]).then((result) => {
        console.log(result.servers);
      });
    });
  });
});
