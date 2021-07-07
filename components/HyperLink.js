import React from 'react';
import {Text, StyleSheet, Linking} from 'react-native';

const HyperLink = ({href, style, children}) => {
  return (
    <Text
      style={{...styles.link, ...style}}
      onPress={() => {
        Linking.openURL(href);
      }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
});

export default HyperLink;
