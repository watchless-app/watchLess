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

const YoutubeSearch = ({onSelectVideo, api}) => {
  const [searchResults, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchInput, setInput] = useState('');

  const doSearch = async () => {
    setSearchLoading(true);
    try {
      const url = `${api}/api/v1/search?q=${searchInput}&local=true`;
      const resultsRaw = await fetch(url);
      let results = await resultsRaw.json();

      setResults(results.slice(0, 10));
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      Alert.alert('Youtube Search faild');
    }
  };

  const handleSelectVideo = videoData => {
    const newData = {
      id: videoData.videoId,
      type: 'video',
      title: videoData.title,
      linkUrl: `https://m.youtube.com/watch?v=${videoData.videoId}`,
      imageUrl: videoData.imageURL,
      creator: videoData.author,
    };
    onSelectVideo(newData);
    setResults([]);
  };

  return (
    <View>
      <View style={styles.textInputWrapper}>
        <TextInput value={searchInput} onChangeText={text => setInput(text)} />
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
            const imageURL = item.videoThumbnails[0].url.replace(':3000', '');
            return (
              <TouchableOpacity
                onPress={() => {
                  handleSelectVideo({...item, imageURL});
                }}>
                <View style={styles.videoWrapper} key={item.videoId}>
                  <Text style={styles.videoText}>{item.title}</Text>
                  <Text style={styles.videoAuthor}>{item.author}</Text>
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
  videoAuthor: {
    textAlign: 'center',
  },
  videoText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default YoutubeSearch;
