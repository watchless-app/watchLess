import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultSettings} from '../constants/DefaultSettings';
import {version as currentVersion} from '../package.json';

export default async (settings, setSettings, checkVersion = true) => {
  const lastVersion = await AsyncStorage.getItem('lastVersion');

  if (checkVersion) {
    if (lastVersion === currentVersion) {
      setSettings(settings);
      return;
    }
  }

  /*
    Take default settings and replace all fields from previously stored settings.
    Like this, all settings that the user has changed will stay
    and new fields added by an update will be available.
  */

  const newSettings = {
    ...DefaultSettings,
    motivationalSettings: settings.motivationalSettings,
  };

  newSettings.hideSettings = {
    ...DefaultSettings.hideSettings,
    ...settings.hideSettings,
  };

  newSettings.advancedSettings = {
    ...DefaultSettings.advancedSettings,
    ...settings.advancedSettings,
  };

  AsyncStorage.setItem('settings', JSON.stringify(newSettings));
  setSettings(newSettings);

  if (checkVersion) {
    setLastVersion();
  }
};

export const setLastVersion = () => {
  AsyncStorage.setItem('lastVersion', currentVersion);
};
