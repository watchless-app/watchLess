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
        }}>{`watchLess App v${version}`}</Text>
      <Text>
        This is app is an Open Source Project with the{' '}
        <Link href="https://github.com/watchless-app">
          source code available on GitHub
        </Link>{' '}
        under the{' '}
        <Link href="https://github.com/watchless-app/watchLess/blob/main/LICENSE">
          MIT
        </Link>{' '}
        license
      </Text>
      <Text>
        Also check out{' '}
        <Link href="https://watchless-app.github.io/">
          watchless-app.github.io
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
