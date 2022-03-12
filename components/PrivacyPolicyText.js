import React from 'react';
import {View, Text} from 'react-native';

import Link from '../components/HyperLink';

const PrivacyPolicyText = () => {
  return (
    <View>
      <Text>
        This app (watchLess) displays the official mobile Youtube.com website
        and removes some addictive elements from the view. This app is a
        3rd-party client: all content is provided by YouTube.
      </Text>
      <Text>
        Because of this the{' '}
        <Link href="https://policies.google.com/privacy">Privacy Policies</Link>{' '}
        and{' '}
        <Link href="https://policies.google.com/terms">Tearms of Service</Link>{' '}
        of Youtube apply.
      </Text>
      <Text>
        While the Youtube website displayed in this app records and stores
        personal data, the app itself does not record personal information in
        any way.
      </Text>
      <Text style={{marginTop: 10, fontWeight: 'bold'}}>
        Person responsible:{' '}
      </Text>
      <Text>
        Jakob Gaiswinkler (
        <Link href="https://www.jakobg.dev">www.jakobg.dev</Link>)
      </Text>
      <Text>watchless@jakobg.dev</Text>
      <Text> </Text>
    </View>
  );
};

export default PrivacyPolicyText;
