import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  DeviceEventEmitter,
  Alert,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';
import WebViewHeader from '../components/WebViewHeader';

import {castVideo} from '../utils/castVideoFn';

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

const webviewRef = React.createRef();

const WebViewScreen = ({settings, setSettings, openSettings, urlToOpen}) => {
  const client = useRemoteMediaClient();

  const handleBackButton = () => {
    webviewRef.current?.goBack();
    return true;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('WebViewPlayVideoFullScreenStart', () => {
        console.log('WebViewPlayVideoFullScreenStart');
        Orientation.lockToLandscape();
      });
      DeviceEventEmitter.addListener('WebViewPlayVideoFullScreenEnd', () => {
        console.log('WebViewPlayVideoFullScreenEnd');
        Orientation.lockToPortrait();
      });

      GoogleCast.onCastStateChanged(castState => {
        // 'noDevicesAvailable' | 'notConnected' | 'connecting' | 'connected'
        if (castState === 'connected') {
          webviewRef.current?.injectJavaScript(`alert('Chromecast connected')`);
        }
      });

      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  }, []);

  if (!settings) {
    return (
      <View style={styles.loaderContaienr}>
        <ActivityIndicator size={'large'} color="grey" />
      </View>
    );
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
      case 'cast_button_click':
        GoogleCast.showCastDialog();
        break;

      case 'video_playpause':
        if (data.url.indexOf('/watch?v=') > -1 && data.type === 'play') {
          try {
            castVideo(data, client, settings);
          } catch (e) {
            Alert.alert('Casting failed.');
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
      <View style={styles.castButton}>
        {/* Include Cast button and hide it, otherwise cast doesn't work */}
        <CastButton />
      </View>
      {!settings.advancedSettings.hideHeader && (
        <WebViewHeader setSettings={setSettings} openSettings={openSettings} />
      )}
      <WebView
        ref={webviewRef}
        source={{uri: urlToOpen}}
        allowsFullscreenVideo={true}
        injectedJavaScript={stringJSandCSS}
        onMessage={handleMessage}
        onShouldStartLoadWithRequest={handleLoad}
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
  // Hide Button by moving off screen (cast doesn't work if button not placed)
  castButton: {
    display: 'none',
    position: 'absolute',
    top: -40,
    right: -40,
  },
});

export default WebViewScreen;
