import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Linking,
  Text,
  TouchableHighlight,
} from 'react-native';

// import Share from 'react-native-share';
// import {encode} from 'base-64';
// import {decode as utf8decode, encode as utf8encode} from 'utf8';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import updateChanges from '../utils/updateChanges';

import Colors from '../constants/Colors';

const SettingsOverview = ({navigation, openURL, settings, setSettings}) => {
  // const handleImport = () => {
  //   try {
  //     DocumentPicker.pick().then(result => {
  //       RNFS.readFile(result.uri).then(data => {
  //         // const settingsString = utf8decode(data);
  //         const settingsString = data;
  //         const newSettings = JSON.parse(settingsString);
  //         if (typeof newSettings.hideSettings === 'object') {
  //           updateChanges(newSettings, setSettings, false);
  //           Alert.alert('Settings imported.', 'You have to save now!');
  //         } else {
  //           throw new Error('Selected file has wrong format.');
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     Alert.alert(error);
  //   }
  // };

  // const handleExport = () => {
  //   const bytes = utf8encode(JSON.stringify(settings));
  //   const base64Data = encode(bytes);
  //   const options = {
  //     title: 'AFV_settings.txt',
  //     filename: 'AFV_settings',
  //     type: 'text/plain',
  //     url: `data:text/plain;base64,${base64Data}`,
  //   };
  //   Share.open(options)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       err && console.log(err);
  //     });
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemList}>
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => Linking.openURL('https://watchless.tribe.so/')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Help</Text>
            </View>
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('donation')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Donate</Text>
            </View>
          </TouchableHighlight> */}
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('hidesettings')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Hide Elements</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('motivational')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Motivational Settings</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('unsubbot')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Unsubscribe Bot</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('advanced')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Advanced Options</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.underlayColor}
            onPress={() => navigation.navigate('info')}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Information / Licence</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* <View style={styles.buttonWrapper}>
          <View style={{...styles.button, marginRight: 10}}>
            <Button title="Export" onPress={handleExport} />
          </View>
          <View style={styles.button}>
            <Button title="Import" onPress={handleImport} />
          </View>
        </View> */}
        <View style={styles.buttonWrapper}>
          <View style={{...styles.button, marginRight: 10}}>
            <Button
              title="Save"
              onPress={() => {
                navigation.navigate('save');
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Open Youtube"
              onPress={() => {
                openURL();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  itemList: {
    marginVertical: 10,
  },
  item: {marginBottom: 1, borderBottomColor: 'grey', borderBottomWidth: 0.6},
  itemText: {paddingVertical: 10},
});

export default SettingsOverview;
