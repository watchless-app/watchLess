import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const SwitchItem = ({
  title,
  id,
  value,
  setSettings,
  settingsPath = 'hideSettings',
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
      <Switch
        style={styles.switch}
        value={value}
        onValueChange={value => {
          setSettings(prevState => {
            const newState = {...prevState};
            prevState[settingsPath][id] = value;
            return newState;
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  itemText: {
    flex: 1,
  },
});

export default SwitchItem;
