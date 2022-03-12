import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HyperLink from '../components/HyperLink';

const Donate = () => {
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
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default Donate;
