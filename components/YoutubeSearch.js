import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {YOUTUBE_API_KEY} from '@env';

const YoutubeSearch = ({onSelectVideo}) => {
  const [searchResults, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchInput, setInput] = useState('');

  const doSearch = async () => {
    setSearchLoading(true);
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${searchInput}&local=true&key=${YOUTUBE_API_KEY}`;
      const resultsRaw = await fetch(url);
      let results = await resultsRaw.json();

      if (!results?.items) {
        throw new Exception();
      }

      setResults(results.items);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      Alert.alert('Youtube Search faild');
    }
  };

  const handleSelectVideo = videoData => {
    const newData = {
      id: videoData.id.videoId,
      type: 'video',
      title: videoData.snippet.title,
      linkUrl: `https://m.youtube.com/watch?v=${videoData.id.videoId}`,
      imageUrl: videoData.imageURL,
      creator: videoData.snippet.channelTitle,
    };
    onSelectVideo(newData);
    setResults([]);
  };

  return (
    <View>
      <View style={styles.textInputWrapper}>
        <TextInput
          value={searchInput}
          placeholder={'Input video name'}
          onChangeText={text => setInput(text)}
        />
      </View>
      <View style={{alignSelf: 'flex-start'}}>
        <Button
          color="#272822"
          title="Search Video on Youtube"
          onPress={doSearch}
        />
      </View>
      <View>
        {searchLoading && <ActivityIndicator size="small" color="grey" />}
        {!searchLoading &&
          searchResults.map(item => {
            const imageURL = item.snippet.thumbnails.high.url;
            return (
              <TouchableOpacity
                onPress={() => {
                  handleSelectVideo({...item, imageURL});
                }}
                key={item.id.videoId}>
                <View style={styles.videoWrapper}>
                  <Text style={styles.videoText}>{item.snippet.title}</Text>
                  <Text style={styles.channelTitle}>
                    {item.snippet.channelTitle}
                  </Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: imageURL,
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputWrapper: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  videoWrapper: {
    marginVertical: 3,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  image: {
    width: '100%',
    height: 150,
  },
  channelTitle: {
    textAlign: 'center',
  },
  videoText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default YoutubeSearch;
