import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import SwitchItem from '../components/SwitchItem';

const AdvancedOptions = ({setSettings, advancedSettings}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SwitchItem
          title="Hide AF-Video Header (recommended)"
          id="hideHeader"
          value={advancedSettings.hideHeader}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <SwitchItem
          title="Lock Orientation"
          id="orientationLock"
          value={advancedSettings.orientationLock}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <SwitchItem
          title="Force Dark mode"
          id="forceDarkMode"
          value={advancedSettings.forceDarkMode}
          setSettings={setSettings}
          settingsPath="advancedSettings"
        />

        <View style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>Save Countdown in Seconds:</Text>
          <TextInput
            value={advancedSettings.countdown.toString()}
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
          <Text style={styles.itemTitle}>Custom CSS:</Text>
          <TextInput
            value={advancedSettings.customCSS}
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
            value={advancedSettings.customJS}
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
