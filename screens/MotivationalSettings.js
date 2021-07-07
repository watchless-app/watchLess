import React, {useLayoutEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const MotivationalSettingsItem = ({item, navigation, onSort}) => {
  const handleOpenDetails = () => {
    navigation.navigate('addmotivational', {id: item.id});
  };

  const output = item.type === 'quote' ? item.text : item.title;

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemTextWrapper}
        onPress={handleOpenDetails}>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.type === 'quote' ? 'Quote: ' : 'Video: '}
          {output}
        </Text>
      </TouchableOpacity>

      <View style={styles.itemButtonContainer}>
        <TouchableOpacity onPress={() => onSort(item.index, -1)}>
          <Text style={styles.itemButton}>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSort(item.index, 1)}>
          <Text style={styles.itemButton}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MotivationalSettings = ({setSettings, settings, navigation}) => {
  const sorted = [...settings].sort((a, b) => {
    return a.index - b.index;
  });

  const handleMoveItem = useCallback((index, direction) => {
    setSettings(prevState => {
      const newState = {...prevState};

      const localSorted = [...newState.motivationalSettings].sort((a, b) => {
        return a.index - b.index;
      });

      const actualItemIndex = localSorted.findIndex(
        item => item.index === index,
      );
      const indexToSwap = actualItemIndex + direction;

      if (
        // Check if not last item or first item
        actualItemIndex < 0 ||
        indexToSwap >= localSorted.length ||
        indexToSwap < 0
      ) {
        return newState;
      } else {
        localSorted[actualItemIndex].index = localSorted[indexToSwap].index;
        localSorted[indexToSwap].index = index;
        newState.motivationalSettings = localSorted;

        return newState;
      }
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('addmotivational')}>
          <Text style={{padding: 5, paddingRight: 15}}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        renderItem={({item}) => (
          <MotivationalSettingsItem
            key={item.id}
            item={item}
            navigation={navigation}
            onSort={handleMoveItem}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemText: {},
  itemButtonContainer: {
    flexDirection: 'column',
    // flex: 1,
    flexBasis: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemButton: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default MotivationalSettings;
