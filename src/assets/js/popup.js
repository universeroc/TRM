var initHeaders = function() {
  var type = document.querySelector('.type');
  if (type) {
    type.innerText = chrome.i18n.getMessage('popupTypeSection');
  }

  var byte = document.querySelector('.byte');
  if (byte) {
    byte.innerText = chrome.i18n.getMessage('popupByteSection');
  }

  var readCache = document.querySelector('.readCache');
  if (readCache) {
    readCache.innerText = chrome.i18n.getMessage('popupReadCacheSection');
  }

  var url = document.querySelector('.url');
  if (url) {
    url.innerText = chrome.i18n.getMessage('popupUrlSection');
  }
};

!function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type && message.type == 'response') {
      var resources = message.resources;
      console.log(message, resources);

      var table = document.querySelector('table');
      if (table) {
        var formatResources = '';
        for (var i = 0; i < resources.length; i++) {
          formatResources +=
            '<tr>'+
              '<td class="type">' + resources[i].type +
              '</td>' +
              '<td class="byte">' + resources[i].byte +
              '</td>' +
              '<td class="readCache">' + resources[i].fromCache +
              '</td>' +
              '<td class="url" title="'+ resources[i].url +'">' + resources[i].url +
              '</td>' +
            '</tr>';
        }

        table.innerHTML = "<tr class='section'><th class='type'></th><th class='byte'></th><th class='readCache'></th><th class='url'></th></tr>";
        table.innerHTML += formatResources;

        initHeaders();
      }
    }
  });

  chrome.runtime.sendMessage({
    'type': 'request-current-tab-resources-data'
  });
}();
