import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SwitchItem from '../components/SwitchItem';

const HideSettings = ({settings, setSettings}) => {
  /*
    To add an hide option follow these steps:
    1. Copy SwitchItem and give it unique id
    2. change value prop to settings.your unique id
    3. Add default value to DefaultSettings.js in hideSettings object (use your unique id as key)
    4. Add css rule to DefaultSettings.js in HideCSS object (use your unique id as key)
  */
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Addictive elements:</Text>
          <SwitchItem
            title="Hide Start Page"
            id="startPage"
            value={settings.startPage}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Trending Page"
            id="trendingPage"
            value={settings.trendingPage}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Recommended Videos"
            id="recommended"
            value={settings.recommended}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Subscription Feed"
            id="subscriptionFeed"
            value={settings.subscriptionFeed}
            setSettings={setSettings}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opinion-influencing elements:</Text>
          <SwitchItem
            title="Hide Like Count"
            id="likeCount"
            value={settings.likeCount}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Like Button"
            id="likeButton"
            value={settings.likeButton}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Views"
            id="views"
            value={settings.views}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Comments"
            id="comments"
            value={settings.comments}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Comment Count"
            id="commentCount"
            value={settings.commentCount}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Subscriber Count"
            id="subscriberCount"
            value={settings.subscriberCount}
            setSettings={setSettings}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
});

export default HideSettings;
