import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MotivationalItem = ({data, openURL}) => {
  if (data.type === 'quote') {
    return (
      <View style={styles.quoteItem}>
        <Text style={styles.quoteText}>{data.text}</Text>
        <Text style={styles.quoteAuthor}>{data.author}</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          openURL(data.linkUrl);
        }}>
        <View style={styles.videoItem}>
          <Image
            style={styles.videoImage}
            resizeMode="contain"
            source={{
              uri: data.imageUrl,
            }}
          />
          <Text style={styles.videoTitle}>{data.title}</Text>
          <Text style={styles.videoCreator}>{data.creator}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const Save = ({settings, navigation, openURL}) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    AsyncStorage.getItem('settings').then(rawData => {
      const parsedData = JSON.parse(rawData);
      setCountdown(parsedData.advancedSettings.countdown);
    });
  }, []);

  const handleSave = () => {
    AsyncStorage.setItem('settings', JSON.stringify(settings)).then(() => {
      navigation.goBack();
    });
  };

  const doCountdown = () => {
    setTimeout(() => {
      if (typeof setCountdown === 'function') {
        setCountdown(prevCountdown => {
          if (prevCountdown > 0) {
            doCountdown();
            return prevCountdown - 1;
          }
        });
      }
    }, 1000);
  };

  useEffect(() => {
    doCountdown();
  }, []);

  const {motivationalSettings} = settings;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          title={`Save ${countdown > 0 ? countdown : ''}`}
          disabled={countdown > 0}
          onPress={handleSave}
        />
        <View style={styles.motivationalContainer}>
          {motivationalSettings.map(item => (
            <View style={styles.motivationalItem}>
              <MotivationalItem data={item} openURL={openURL} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  motivationalContainer: {
    marginTop: 25,
  },
  motivationalItem: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  quoteText: {
    fontSize: 15,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  videoTitle: {
    fontSize: 15,
  },
  videoCreator: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoImage: {
    width: '100%',
    height: Dimensions.get('window').width / 1.9,
    marginBottom: 5,
  },
});

export default Save;
