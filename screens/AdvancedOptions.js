import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import SwitchItem from '../components/SwitchItem';

const AdvancedOptions = ({setSettings, settings}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SwitchItem
          title="Hide AF-Video Header (recommended)"
          id="hideHeader"
          value={settings.hideHeader}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <View style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>Save Countdown in Seconds:</Text>
          <TextInput
            value={settings.countdown.toString()}
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={text => {
              setSettings(prevState => {
                const newState = {...prevState};
                newState.advancedSettings.countdown = text
                  ? parseInt(text)
                  : '';
                return newState;
              });
            }}
          />
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>Invidious API URL:</Text>
          <TextInput
            value={settings.invidiousApi}
            style={styles.textInput}
            onChangeText={url => {
              setSettings(prevState => {
                const newState = {...prevState};
                newState.advancedSettings.invidiousApi = url;
                return newState;
              });
            }}
          />
        </View>

        <SwitchItem
          title="Auto Update Invidious API URL"
          id="invidiousApiAutoUpdate"
          value={settings.invidiousApiAutoUpdate}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <SwitchItem
          title="Disable Autoplay"
          id="noautoplay"
          value={settings.noautoplay}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <View style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>Custom CSS:</Text>
          <TextInput
            value={settings.customCSS}
            style={styles.textInput}
            multiline
            onChangeText={text => {
              setSettings(prevState => {
                const newState = {...prevState};
                newState.advancedSettings.customCSS = text;
                return newState;
              });
            }}
          />
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>Custom JS:</Text>
          <TextInput
            value={settings.customJS}
            style={styles.textInput}
            multiline
            onChangeText={text => {
              setSettings(prevState => {
                const newState = {...prevState};
                newState.advancedSettings.customJS = text;
                return newState;
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemWrapper: {
    marginBottom: 14,
  },
  textInput: {
    borderBottomWidth: 0.6,
    borderBottomColor: 'grey',
  },
});

export default AdvancedOptions;
