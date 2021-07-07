import React from 'react';
import {
  View,
  Text,
  Button,
  BackHandler,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrivacyPolicyText from '../components/PrivacyPolicyText';

const PrivacyPolicy = ({onPolicyAccepted}) => {
  const handleAcceptButton = () => {
    AsyncStorage.setItem('privacyPolicyAccepted', JSON.stringify(true)).then(
      () => {
        onPolicyAccepted(true);
      },
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{fontSize: 20, marginBottom: 4, fontWeight: 'bold'}}>
          Privacy Policy
        </Text>
        <PrivacyPolicyText />
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button
              title={`I agree with the Terms of Service & Privacy Policy stated above`}
              onPress={handleAcceptButton}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Decline"
              onPress={() => {
                BackHandler.exitApp();
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
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    marginBottom: 3,
  },
  buttonWrapper: {
    flexDirection: 'column',
    marginVertical: 10,
  },
});

export default PrivacyPolicy;
