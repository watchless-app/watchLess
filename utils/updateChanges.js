import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultSettings} from '../constants/DefaultSettings';
import {version as currentVersion} from '../package.json';

export default async (settings, setSettings) => {
  const lastVersion = await AsyncStorage.getItem('lastVersion');

  if (
    !(
      convertVersionStringIntoNumber(currentVersion) >
      convertVersionStringIntoNumber(lastVersion)
    )
  ) {
    setSettings(settings);
    return;
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

  if (settings.advancedSettings.invidiousApiAutoUpdate) {
    newSettings.advancedSettings.invidiousApi =
      DefaultSettings.advancedSettings.invidiousApi;
  }

  setSettings(newSettings);

  setLastVersion();
};

export const setLastVersion = () => {
  AsyncStorage.setItem('lastVersion', currentVersion);
};

const convertVersionStringIntoNumber = string => {
  const strippedString = string.replace('.', '').replace('.', '');
  return parseInt(strippedString);
};
