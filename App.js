import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {Linking, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import WebViewScreen from './screens/WebView';
import PrivacyPolicy from './screens/PrivacyPolicy';
import SettingsNavigator from './navigator/SettingsNavigator';

import {DefaultSettings} from './constants/DefaultSettings';
import updateChanges, {setLastVersion} from './utils/updateChanges';

const navigatorRef = React.createRef();

const App = () => {
  const [showYoutube, setShowYoutube] = useState(true);
  const [urlToOpen, setUrlToOpen] = useState('https://m.youtube.com/');
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(true);
  const [pageToNaviagteTo, setPageToNavigateTo] = useState();
  const [settings, setSettings] = useState();
  const scheme = useColorScheme();

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setUrlToOpen(initialUrl);
      }
    };
    getUrlAsync();

    const setDeepLinkURL = ({url}) => {
      if (url) {
        setUrlToOpen(url);
      }
    };

    Linking.addEventListener('url', setDeepLinkURL);

    return () => {
      Linking.removeEventListener('url', setDeepLinkURL);
    };
  }, []);

  AsyncStorage.getItem('privacyPolicyAccepted').then(value => {
    if (value) {
      setPrivacyPolicyAccepted(JSON.parse(value));
    } else {
      setPrivacyPolicyAccepted(false);
      AsyncStorage.setItem('privacyPolicyAccepted', JSON.stringify(false));
    }
  });

  useEffect(() => {
    AsyncStorage.getItem('settings').then(value => {
      if (value) {
        updateChanges(JSON.parse(value), setSettings);
      } else {
        setSettings(DefaultSettings);
        AsyncStorage.setItem('settings', JSON.stringify(DefaultSettings));
        setLastVersion();
      }
    });
  }, [showYoutube]);

  if (!privacyPolicyAccepted) {
    return <PrivacyPolicy onPolicyAccepted={setPrivacyPolicyAccepted} />;
  }

  const openSettings = page => {
    setPageToNavigateTo(page);
    setShowYoutube(false);
  };

  const openURL = url => {
    if (url) {
      setUrlToOpen(url);
    }
    setShowYoutube(true);
  };

  return (
    <NavigationContainer
      ref={navigatorRef}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {showYoutube ? (
        <WebViewScreen
          openSettings={openSettings}
          settings={settings}
          setSettings={setSettings}
          urlToOpen={urlToOpen}
        />
      ) : (
        <SettingsNavigator
          settings={settings}
          setSettings={setSettings}
          pageToNaviagteTo={pageToNaviagteTo}
          navigatorRef={navigatorRef}
          openURL={openURL}
        />
      )}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});

export default App;
