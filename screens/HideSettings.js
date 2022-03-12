import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SwitchItem from '../components/SwitchItem';

const HideSettings = ({hideSettings, setSettings}) => {
  /*
    To add an hide option follow these steps:
    1. Copy SwitchItem and give it unique id
    2. change value prop to hideSettings.your unique id
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
            value={hideSettings.startPage}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Trending Page"
            id="trendingPage"
            value={hideSettings.trendingPage}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Block all Shorts"
            id="shorts"
            value={hideSettings.shorts}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Shorts - Disable Swipe"
            id="shortsSwipe"
            value={hideSettings.shortsSwipe}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Shorts Tab"
            id="shortsTab"
            value={hideSettings.shortsTab}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Recommended Videos"
            id="recommended"
            value={hideSettings.recommended}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Subscription Feed"
            id="subscriptionFeed"
            value={hideSettings.subscriptionFeed}
            setSettings={setSettings}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opinion-influencing elements:</Text>
          <SwitchItem
            title="Hide Like Count"
            id="likeCount"
            value={hideSettings.likeCount}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Like Button"
            id="likeButton"
            value={hideSettings.likeButton}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Views"
            id="views"
            value={hideSettings.views}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Comments"
            id="comments"
            value={hideSettings.comments}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Comment Count"
            id="commentCount"
            value={hideSettings.commentCount}
            setSettings={setSettings}
          />
          <SwitchItem
            title="Hide Subscriber Count"
            id="subscriberCount"
            value={hideSettings.subscriberCount}
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
