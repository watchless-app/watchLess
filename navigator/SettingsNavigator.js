import React, {useEffect} from 'react';

import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsOverview from '../screens/SettingsOverview';
import Info from '../screens/Info';
import AdvancedOptions from '../screens/AdvancedOptions';
import HideSettings from '../screens/HideSettings';
import MotivationalSettings from '../screens/MotivationalSettings';
import AddMotivationalSetting from '../screens/AddMotivationalSetting';
import Donation from '../screens/Donation';
import UnSubscribeBot from '../screens/UnSubscribeBot';
import Save from '../screens/Save';

Stack = createStackNavigator();

const SettingsNavigator = ({
  settings,
  setSettings,
  navigatorRef,
  pageToNaviagteTo,
  openURL,
}) => {
  if (!settings) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  useEffect(() => {
    if (pageToNaviagteTo) {
      navigatorRef.current?.navigate(pageToNaviagteTo);
    }
  }, [pageToNaviagteTo]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="settings" options={{title: 'Settings'}}>
        {props => (
          <SettingsOverview
            {...props}
            settings={settings}
            setSettings={setSettings}
            openURL={openURL}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="info"
        options={{title: 'Info / Licence'}}
        component={Info}
      />
      <Stack.Screen
        name="donation"
        options={{title: 'Donation'}}
        component={Donation}
      />
      <Stack.Screen
        name="unsubbot"
        options={{title: 'Unsubscribe Bot'}}
        component={UnSubscribeBot}
      />
      <Stack.Screen name="advanced" options={{title: 'Advanced Options'}}>
        {props => (
          <AdvancedOptions
            {...props}
            settings={settings.advancedSettings}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="hidesettings" options={{title: 'Hide Elements'}}>
        {props => (
          <HideSettings
            {...props}
            settings={settings.hideSettings}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="motivational"
        options={{title: 'Motivational Settings'}}>
        {props => (
          <MotivationalSettings
            {...props}
            settings={settings.motivationalSettings}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="addmotivational" options={{title: 'Add Motivation'}}>
        {props => (
          <AddMotivationalSetting
            {...props}
            settings={settings.motivationalSettings}
            invidiousApi={settings.advancedSettings.invidiousApi}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="save" options={{title: 'Save Settings'}}>
        {props => <Save {...props} settings={settings} openURL={openURL} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// const styles = StyleSheet.create({});

export default SettingsNavigator;
