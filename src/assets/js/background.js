resourceData = {};

chrome.webRequest.onResponseStarted.addListener(
  function(details) {
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name.toLowerCase() === 'content-length') {
        // console.log(details.url + ': ' + details.responseHeaders[i].value +
        //             'bytes');
        // console.log({ 'frameId:':details.frameId, 'parentFrameId':details.parentFrameId,
        //               'tabId': details.tabId, 'type': details.type, 'fromCache':details.fromCache});

        if (resourceData[details.tabId]) {
          resourceData[details.tabId].push({
            'type' : details.type,
            'byte' : details.responseHeaders[i].value,
            'fromCache': details.fromCache,
            'url': details.url
          });
        } else {
          resourceData[details.tabId] = [{
            'type' : details.type,
            'byte' : details.responseHeaders[i].value,
            'fromCache': details.fromCache,
            'url': details.url
          }];
        }
      }
    }
  },
  {urls: ["<all_urls>"]},
  ["responseHeaders"]);

// send data to popup page to display
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type && message.type == 'request-current-tab-resources-data') {

    chrome.tabs.query({active:true}, function(tabs) {
      if (tabs) {
        var tabId = tabs[tabs.length-1].id;
        console.log(resourceData[tabId]);

        chrome.runtime.sendMessage({
          'type': 'response',
          'resources': resourceData[tabId]
        });
      }
    });
  }
});
