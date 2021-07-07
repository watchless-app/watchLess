import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import PrivacyPolicyText from '../components/PrivacyPolicyText';
import Link from '../components/HyperLink';

import {version} from '../package.json';

const Info = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
        }}>{`Addiction Free Video App v${version}`}</Text>
      <Text>
        This is app is an Open Source Project with the{' '}
        <Link href="https://github.com/addiction-free-video">
          source code available on GitHub
        </Link>{' '}
        under the{' '}
        <Link href="https://github.com/addiction-free-video/addiction-free-video/blob/master/LICENSE">
          Apache 2.0
        </Link>{' '}
        license
      </Text>
      <Text>
        Also check out{' '}
        <Link href="https://addiction-free-video.github.io/">
          addiction-free-video.github.io
        </Link>{' '}
        for more information.
      </Text>

      <Text style={{fontWeight: 'bold', marginTop: 10}}>Privacy policy</Text>
      <PrivacyPolicyText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default Info;
