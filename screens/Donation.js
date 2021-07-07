import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import {requestPurchase, useIAP} from 'react-native-iap';

import AcceptedCountries from '../constants/AcceptedCountries';

const iapSkus = [
  'com.addiction_free_video.donate3',
  'com.addiction_free_video.donate9',
  'com.addiction_free_video.donate15',
];

const handleDonation = amount => {
  if (__DEV__) {
    requestPurchase('android.test.purchased').then(console.log);
    return;
  }

  requestPurchase(`com.addiction_free_video.donate${amount}`).then(console.log);
};

const Donate = ({navigation}) => {
  const {
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
    getProducts,
  } = useIAP();
  const [amountToDonate, setAmountToDonate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [invalidCountrySelected, setInvalidCountrySelected] = useState(false);

  useEffect(() => {
    getProducts(__DEV__ ? ['android.test.purchased'] : iapSkus);
  }, [getProducts]);

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        if (receipt)
          try {
            await finishTransaction(purchase);
            Alert.alert('Thank you for your donation!', '', [
              {
                text: 'Close',
                onPress: () => {
                  navigation.navigate('settings');
                },
              },
            ]);
          } catch (ackErr) {
            Alert.alert(ackErr);
          }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  useEffect(() => {
    if (currentPurchaseError) {
      Alert.alert(currentPurchaseError?.message);
    }
  }, [currentPurchaseError]);

  if (invalidCountrySelected) {
    return (
      <View style={styles.container}>
        <Text>
          Sorry, we do not accept Donations from your country. Thank you
          anyways!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!amountToDonate && (
        <View>
          <Text style={styles.text}>
            Thank you for considering a donation! 🙏
          </Text>
          <View style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Button
                title="3€"
                onPress={() => {
                  setAmountToDonate(3);
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="9€"
                onPress={() => {
                  setAmountToDonate(9);
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="15€"
                onPress={() => {
                  setAmountToDonate(15);
                }}
              />
            </View>
          </View>
        </View>
      )}
      {amountToDonate && (
        <View>
          <Text style={styles.countryText}>Please pick your country:</Text>
          <CountryPicker
            countryCode={selectedCountry && selectedCountry.cca2}
            withCountryNameButton={true}
            onSelect={country => setSelectedCountry(country)}
          />
          {selectedCountry && (
            <View style={styles.continueButton}>
              <Button
                title="Continue"
                onPress={() => {
                  if (isLocationAccepted(selectedCountry)) {
                    handleDonation(amountToDonate);
                  } else {
                    setInvalidCountrySelected(true);
                  }
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    marginVertical: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 4,
    flexGrow: 1,
  },
  countryText: {
    marginVertical: 15,
  },
  continueButton: {
    marginVertical: 20,
  },
});

export default Donate;

const isLocationAccepted = data => {
  let isAccepted = false;

  const countryFound = AcceptedCountries.find(value => {
    return value.Code === data.cca2;
  });

  if (countryFound) {
    isAccepted = true;
  }

  return isAccepted;
};
