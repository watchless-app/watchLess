export default () => {
  return `
try {
  (function () {
    // prevent from running twice
    if (window['watchless_has_run']) {
      return;
    }
    window['watchless_has_run'] = true;

    var allSettings;
    if (typeof watchless_allSettings === 'string') {
      allSettings = JSON.parse(watchless_allSettings);
    } else {
      alert('Error: Not defined watchless_allSettings');
      return;
    }

    var blockedURLs = allSettings.blockedURLs;

    var lastWatchedShortVideo = '';

    ////////////////////
    // Elements
    //////////////////
    var videoElement;

    ////////////////////
    // Functions
    //////////////////

    // Send post messages
    function sendPostMessage(messageToSend) {
      if (!window.ReactNativeWebView) {
        console.warn('window.ReactNativeWebView postMessage API not found!');
        throw 'window.ReactNativeWebView postMessage API not found!';
      } else {
        window.ReactNativeWebView.postMessage(JSON.stringify(messageToSend));
      }
    }

    // Send message to react native when video play/pauses for media controls
    function videoChangeEvent(e) {
      sendPostMessage({
        action: 'video_playpause',
        type: e.type,
        url: window.location.href,
      });
    }

    function fullScreenChangeHandle(e) {
      var type = 'exit';

      if (document.fullscreenElement) {
        type = 'start';
      }

      sendPostMessage({
        action: 'fullscreenchange',
        type: type,
      });
    }

    function generateMotivationHTML() {
      var items = allSettings.motivationalSettings;
      var motivation = '';

      for (var i = 0; i < items.length; i++) {
        if (items[i].type === 'quote') {
          motivation +=
            '<div class="watchless-motivational-item"><p class="watchless-motivational-item-text">' +
            items[i].text +
            '</p><p class="watchless-motivational-item-author">' +
            items[i].author +
            '</p></div>';
        } else {
          motivation +=
            '<div class="watchless-motivational-item"><a href="' +
            items[i].linkUrl +
            '"><img src="' +
            items[i].imageUrl +
            '" /><p class="watchless-motivational-item-text">' +
            items[i].title +
            '</p><p class="watchless-motivational-item-author">' +
            items[i].creator +
            '</p></a></div>';
        }
      }

      return motivation;
    }

    function getStartPageHTML() {
      return (
        '<div class="watchless-start-page-content"><a href="https://gotosettings.local" class="watchless-start-page-top-link">Open Settings</a><div class="watchless-start-page-motivation-wrapper">' +
        generateMotivationHTML() +
        '</div></div>'
      );
    }

    function addSettingsButton() {
      //Insert Setings Icon Button on settings page
      var watchlessSettingsButton = document.querySelector(
        '.watchless-settings-button',
      );
      if (!watchlessSettingsButton) {
        var youtubeSettingsButton = document.querySelector(
          'ytm-settings ytm-setting-generic-category',
        );
        if (youtubeSettingsButton) {
          youtubeSettingsButton.insertAdjacentHTML(
            'beforebegin',
            '<a href="https://gotosettings.local" class="watchless-settings-button">watchLess Settings</a>',
          );
        }
      }
    }

    function onPageChange() {
      sendPostMessage({
        action: 'page_change',
      });

      doPageChangeDOMManipulations();

      setTimeout(() => {
        doPageChangeDOMManipulations();
      }, 300);

      setTimeout(() => {
        doPageChangeDOMManipulations();
      }, 1000);

      setTimeout(() => {
        doPageChangeDOMManipulations();
      }, 3000);

      setTimeout(() => {
        doPageChangeDOMManipulations();
      }, 10000);
    }

    function doPageChangeDOMManipulations() {
      // Make sure people don't visit specific pages
      var includesNotAllowedTerm = '';

      for (var i = 0; i < blockedURLs.length; i++) {
        if (
          window.location.href.toLocaleLowerCase().includes(blockedURLs[i].url)
        ) {
          includesNotAllowedTerm = blockedURLs[i].error;
        }
      }

      if (includesNotAllowedTerm) {
        window.location.href = 'https://m.youtube.com/';
        alert(includesNotAllowedTerm);
        return;
      }

      if (allSettings.hideSettings.shortsSwipe) {
        if (window.location.href.includes('youtube.com/shorts/')) {
          if (lastWatchedShortVideo) {
            // Check if acutally different, if not it was double triggered (use 'includes' function to ignore URL fragment)
            if (!window.location.href.includes(lastWatchedShortVideo)) {
              window.location.href = 'https://m.youtube.com/';
              lastWatchedShortVideo = '';
              alert('Swiping on shorts is blocked. You can change this in the settings.');
              return;
            }
          } else {
            lastWatchedShortVideo = window.location.href;
          }
        } else {
          lastWatchedShortVideo = '';
        }
      }

      //Insert Start Page Custom Content (Donation Button)
      var watchlessStartPageContent = document.querySelector(
        '.watchless-start-page-content',
      );
      var startPageContent = document.querySelector(
        'div[tab-identifier="FEwhat_to_watch"]',
      );
      if (allSettings.hideSettings.startPage) {
        if (!watchlessStartPageContent) {
          if (startPageContent) {
            startPageContent.insertAdjacentHTML(
              'beforebegin',
              getStartPageHTML(),
            );
          }
        } else {
          if (watchlessStartPageContent.outerHTML !== getStartPageHTML()) {
            watchlessStartPageContent.outerHTML = getStartPageHTML();
          }
        }
      }

      newVideoElement = document.querySelector('video');
      if (newVideoElement && videoElement !== newVideoElement) {
        try {
          videoElement.removeEventListener('pause', videoChangeEvent);
          videoElement.removeEventListener('play', videoChangeEvent);
        } catch (error) {
          //DoNothing
        }

        videoElement = newVideoElement;

        videoElement.addEventListener('pause', videoChangeEvent);
        videoElement.addEventListener('play', videoChangeEvent);
      }

      addSettingsButton();
    }

    function openYoutubeWindow() {
      // Tell react native that javascript was laodad successfully and to show the inAppBrwoser (hidden by default)
      sendPostMessage({action: 'open'});
    }

    ////////////////////
    // Event Listners
    //////////////////

    addEventListener('fullscreenchange', fullScreenChangeHandle);

    var pushState = window.history.pushState;
    window.history.pushState = function () {
      onPageChange();
      return pushState.apply(window.history, arguments);
    };

    var replaceState = window.history.replaceState;
    window.history.replaceState = function () {
      onPageChange();
      return replaceState.apply(window.history, arguments);
    };

    window.addEventListener('popstate', function () {
      onPageChange();
    });

    ////////////////////
    // Initial Funciton Execution
    //////////////////
    onPageChange();
    openYoutubeWindow();
  })();
} catch (error) {
  alert(error);
  //do nothing
}
`;
};
