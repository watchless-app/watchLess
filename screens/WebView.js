import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  BackHandler,
  useColorScheme,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';

import WebViewHeader from '../components/WebViewHeader';

//Import Youtube JS and CSS
import getCss from '../youtubeJS/youtube.css';
import getJS from '../youtubeJS/youtube';
import getSettingsCss from '../youtubeJS/settingsCss';
import getSettingsJS from '../youtubeJS/settingsJS';

const getCSSInjectWrapper = stringCSS => {
  return `
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(\`${stringCSS}\`));
  document.head.appendChild(style);
  `;
};

const webViewRef = React.createRef();

const WebViewScreen = ({settings, setSettings, openSettings, urlToOpen}) => {
  let scheme = useColorScheme();
  let initialOrientaionLockDone = false;

  const handleBackButton = () => {
    webViewRef.current?.goBack();
    return true;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  }, []);

  useEffect(() => {
    if (settings && initialOrientaionLockDone === false) {
      if (settings.advancedSettings.orientationLock) {
        Orientation.lockToPortrait();
      }
      initialOrientaionLockDone = true;
    }
  }, [settings]);

  if (!settings) {
    return (
      <View style={styles.loaderContaienr}>
        <ActivityIndicator size={'large'} color="grey" />
      </View>
    );
  }

  if (settings.advancedSettings.forceDarkMode) {
    scheme = 'dark';
  }

  const stringCSS = getCSSInjectWrapper(
    `${getCss()} ${getSettingsCss(settings)}`,
  );
  const stringJS = `${getSettingsJS(settings)} ${getJS()}`;
  const stringJSandCSS = `${stringJS} ${stringCSS}`;

  const handleMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);

    switch (data.action) {
      case 'video_playpause':
        if (data.url.indexOf('/watch?v=') > -1 && data.type === 'play') {
          //do nothing
        } else {
          //do nothing
        }
        break;

      case 'fullscreenchange':
        if (settings.advancedSettings.orientationLock) {
          if (data.type === 'start') {
            Orientation.lockToLandscape();
          } else {
            Orientation.lockToPortrait();
          }
        }
        break;

      default:
        break;
    }
  };

  const handleLoad = request => {
    const {url} = request;

    if (url.includes('youtube.com/') || url.includes('accounts.google.com/')) {
      // If Url is Youtube or Login URL than continue in inappbrowser _blank
      return true;
    } else if (url.includes('https://gotosettings.local')) {
      openSettings('settings');
      return false;
    } else if (url.includes('https://gotodonation.local')) {
      openSettings('donation');
      return false;
    } else {
      // If requested URL is non of above open URL in native system Browser
      Linking.openURL(url);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      {!settings.advancedSettings?.hideHeader && (
        <WebViewHeader
          setSettings={setSettings}
          openSettings={openSettings}
          webViewRef={webViewRef}
        />
      )}
      <WebView
        ref={webViewRef}
        source={{uri: urlToOpen}}
        allowsFullscreenVideo={true}
        injectedJavaScript={stringJSandCSS}
        onMessage={handleMessage}
        onShouldStartLoadWithRequest={handleLoad}
        forceDarkOn={scheme === 'dark'}
        onRenderProcessGone={() =>
          setReloadKey(webViewRef.current?.forceUpdate())
        }
        onContentProcessDidTerminate={() =>
          setReloadKey(webViewRef.current?.forceUpdate())
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContaienr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewScreen;
