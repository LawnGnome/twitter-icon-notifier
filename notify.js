// In the content script, all we need to do is look for the new items bar to
// change, send a message to the background page to draw the new shortcut icon,
// and then update the shortcut icon in the document.
(function () {
  var check = function (records, observer) {
    var count = 0;
    var newTweets = document.querySelector(".new-tweets-bar");

    if (newTweets) {
      count = +newTweets.getAttribute("data-item-count");
      observer.observe(newTweets, {attributes: true});
    }

    // The returned data is the data URI to replace the shortcut icon with.
    chrome.runtime.sendMessage(count, function (data) {
      var icon = document.querySelector("head link[rel='shortcut icon']");

      icon.setAttribute("href", data);
      icon.setAttribute("type", "image/png");
    });
  };

  var observer = new MutationObserver(check);
  observer.observe(document.body, {subtree: true, childList: true});
})();
