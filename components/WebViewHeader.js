import React from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewHeader = ({setSettings, openSettings, webViewRef}) => {
  const handlePress = () => {
    Alert.alert('Hide Header?', '', [
      {
        text: 'Cancel',
      },
      {text: 'Open Settings', onPress: openSettings},
      {
        text: 'Hide',
        onPress: () => {
          setSettings(prevState => {
            const newState = {
              ...prevState,
            };
            newState.advancedSettings.hideHeader = true;
            AsyncStorage.setItem('settings', JSON.stringify(newState));
            return newState;
          });
          webViewRef.current?.reload();
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/icon.png')}
            style={{width: 45, height: 45}}
          />
          <Text numberOfLines={1} style={styles.headerLeftText}>
            watchLess
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.headerRightImageWrapper}>
              <Image
                source={require('../assets/arrow-up.png')}
                style={{width: 20, height: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  headerWrapper: {
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 1,
    paddingHorizontal: 2,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    paddingLeft: 0,
    fontSize: 15,
    color: 'black',
  },
  headerRight: {
    justifyContent: 'center',
  },
  headerRightImageWrapper: {
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
});

export default WebViewHeader;
