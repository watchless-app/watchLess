import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import guid from '../utils/guid';
import YoutubeSearch from '../components/YoutubeSearch';

const AddMotivationalSetting = ({
  setSettings,
  motivationalSettings,
  navigation,
  route,
  invidiousApi,
}) => {
  const id = route.params?.id;
  let itemToEdit = null;

  if (id) {
    itemToEdit = motivationalSettings.find(e => e.id === id);
  }

  const editMode = !!itemToEdit;
  const [motivationType, setMotivationType] = useState(
    itemToEdit ? itemToEdit.type : 'quote',
  );
  const [localData, setLocalData] = useState(
    itemToEdit
      ? itemToEdit
      : {
          text: '',
          author: '',
          title: '',
          linkUrl: '',
          imageUrl: '',
          creator: '',
        },
  );

  const handleSave = () => {
    setSettings(prevSettings => {
      const newSettings = {...prevSettings};

      if (!localData.text && !localData.title) {
        return newSettings;
      }

      //Get Index from Last Item (highest index becauses sorted) and add one
      const sorted = [...newSettings.motivationalSettings].sort((a, b) => {
        return a.index - b.index;
      });
      const newIndex = sorted[sorted.length - 1].index + 1;

      const newSetting = {
        ...localData,
        id: itemToEdit ? localData.id : guid(),
        index: itemToEdit ? localData.index : newIndex,
        type: motivationType,
      };

      if (itemToEdit) {
        const indexToReplace = newSettings.motivationalSettings.findIndex(
          item => item.id === localData.id,
        );
        newSettings.motivationalSettings[indexToReplace] = newSetting;
      } else {
        newSettings.motivationalSettings.push(newSetting);
      }

      return newSettings;
    });
    navigation.goBack();
  };

  const handleDeleteItem = index => {
    setSettings(prevState => {
      const newState = {...prevState};

      const actualItemIndex = newState.motivationalSettings.findIndex(
        item => item.index === index,
      );

      newState.motivationalSettings.splice(actualItemIndex, 1);
      return newState;
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={{padding: 5, paddingRight: 15}}>OK</Text>
        </TouchableOpacity>
      ),
      title: itemToEdit ? 'Edit Motivaiton' : 'Add Motivaiton',
    });
  }, [navigation, handleSave]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {!editMode && (
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => {
                setMotivationType(prevType =>
                  prevType === 'quote' ? 'video' : 'quote',
                );
              }}
              title={motivationType === 'quote' ? 'Add Video' : 'Add Quote'}
            />
          </View>
        )}
        {editMode && (
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => {
                handleDeleteItem(id);
                navigation.goBack();
              }}
              title="Delete"
            />
          </View>
        )}
        {motivationType === 'quote' && (
          <View>
            <View style={styles.textInputWrapper}>
              <Text>Quote:</Text>
              <TextInput
                value={localData.text}
                multiline
                onChangeText={text => {
                  setLocalData(prevState => {
                    return {...prevState, text};
                  });
                }}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <Text>Author:</Text>
              <TextInput
                value={localData.author}
                onChangeText={author => {
                  setLocalData(prevState => {
                    return {...prevState, author};
                  });
                }}
              />
            </View>
          </View>
        )}
        {motivationType === 'video' && (
          <View style={{marginTop: 15}}>
            <Text>Video: {localData?.title}</Text>
            <YoutubeSearch
              api={invidiousApi}
              onSelectVideo={videoData => {
                setLocalData(videoData);
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInputWrapper: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default AddMotivationalSetting;
