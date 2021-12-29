import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import {
  requestPurchase,
  finishTransaction,
  purchaseUpdatedListener,
  purchaseErrorListener,
  initConnection,
  getProducts,
  endConnection,
} from 'react-native-iap';
const BuildConfig = require('react-native-build-config');

import HyperLink from '../components/HyperLink';
import AcceptedCountries from '../constants/AcceptedCountries';

const iapSkus = [
  'com.addiction_free_video.donate3',
  'com.addiction_free_video.donate9',
  'com.addiction_free_video.donate15',
];

const handleDonation = async amount => {
  try {
    if (__DEV__) {
      await requestPurchase('android.test.purchased');
      return;
    }
    await requestPurchase(`com.addiction_free_video.donate${amount}`);
  } catch (error) {
    Alert.alert('Something went wrong.', error.message);
  }
};

const Donate = ({navigation}) => {
  const [amountToDonate, setAmountToDonate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [invalidCountrySelected, setInvalidCountrySelected] = useState(false);

  // Following code doesn't seem to work with amazon appstore
  //
  // const {
  //   finishTransaction,
  //   currentPurchase,
  //   currentPurchaseError,
  //   getProducts,
  // } = useIAP();
  //
  // useEffect(() => {
  //   const checkCurrentPurchase = async purchase => {
  //     if (purchase) {
  //       const receipt = purchase.transactionReceipt;
  //       if (receipt)
  //         try {
  //           await finishTransaction(purchase);
  //           Alert.alert('Thank you for your donation!', '', [
  //             {
  //               text: 'Close',
  //               onPress: () => {
  //                 navigation.navigate('settings');
  //               },
  //             },
  //           ]);
  //         } catch (ackErr) {
  //           Alert.alert(ackErr);
  //         }
  //     }
  //   };
  //   checkCurrentPurchase(currentPurchase);
  // }, [currentPurchase, finishTransaction]);
  //
  // useEffect(() => {
  //   if (currentPurchaseError) {
  //     Alert.alert(currentPurchaseError?.message);
  //   }
  // }, [currentPurchaseError]);

  let purchaseListener, errorListener;

  useEffect(() => {
    if (BuildConfig.default.FLAVOR == 'website') {
      return;
    }

    const initIAP = async () => {
      await initConnection();

      try {
        await getProducts(__DEV__ ? ['android.test.purchased'] : iapSkus);
      } catch (error) {
        Alert.alert(
          'Something went wrong.',
          'Could not fetch available products.',
        );
        console.log(error);
      }

      purchaseListener = purchaseUpdatedListener(async purchase => {
        // Alert.alert('msg', JSON.stringify(purchase));
        const receipt = purchase.transactionReceipt;
        if (receipt || BuildConfig.default.FLAVOR == 'amazon') {
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
            Alert.alert('Something went wrong');
            console.log(ackErr);
          }
        }
      });

      errorListener = purchaseErrorListener(err => {
        Alert.alert('Something went wrong');
        console.log(err);
      });
    };
    initIAP();

    return () => {
      purchaseListener.remove();
      errorListener.remove();
      endConnection();
    };
  }, []);

  const handleContinuePress = () => {
    if (BuildConfig.default.FLAVOR == 'amazon') {
      handleDonation(amountToDonate);
    } else {
      if (isLocationAccepted(selectedCountry)) {
        handleDonation(amountToDonate);
      } else {
        setInvalidCountrySelected(true);
      }
    }
  };

  if (BuildConfig.default.FLAVOR == 'website') {
    return (
      <View style={styles.container}>
        <Text>Thank you for considering a donation! 🙏</Text>
        <Text>
          To donate please contact me at:{' '}
          <HyperLink
            href={`mailto:afv@jakobg.dev?subject=AF-Video%20App%20Donation&body=I%20would%20like%20to%20donate%20(amount)%3A%0D%0AI%20am%20located%20in%20(your%20country)%3A%0D%0AMy%20name%20is%3A%20`}>
            afv@jakobg.dev
          </HyperLink>
        </Text>
      </View>
    );
  }

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
              <Button title="Continue" onPress={handleContinuePress} />
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
