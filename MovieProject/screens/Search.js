import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';

export default function Search({navigation}) {
  const [queryText, setQueryText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState();

  const handleSubmit = () => {
    Promise.all([
      searchMovieTv(queryText, 'movie'),
      searchMovieTv(queryText, 'tv'),
    ])
      .then(([movies, tv]) => {
        setSearchResults([...movies, ...tv]);
      })
      .catch(err => setError(err));
    console.log(error);
  };

  const handleKeyPress = e => {
    console.log(e.nativeEvent);
  };

  const renderSearchResults = () => {
    if (searchResults && searchResults.length > 0) {
      return (
        <View style={styles.searchItems}>
          <FlatList
            data={searchResults}
            horizontal={false}
            numColumns={3}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}
            contentContainerStyle={{paddingBottom: 200}}
          />
        </View>
      );
    }
    if (searchResults && searchResults.length === 0) {
      console.log(searchResults);
      return (
        <View style={styles.noResults}>
          <Text>No results matching your criteria.</Text>
          <Text>Try Different keywords.</Text>
        </View>
      );
    }
    if (!searchResults) {
      return (
        <View style={styles.noResults}>
          <Text>Type something to search.</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.noResults}>
          <Text>Oops, something went wrong.</Text>
        </View>
      );
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView forceInset={{bottom: 'never'}}>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={setQueryText}
              value={queryText}
              placeholder="Search Movies and TV Shows"
              onSubmitEditing={handleSubmit}
            />
          </View>
          <Pressable onPress={handleSubmit}>
            <Icon name="search-outline" size={30} />
          </Pressable>
        </View>
        {renderSearchResults()}
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  container: {
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },

  noResults: {
    alignItems: 'center',
  },

  searchItems: {
    padding: 10,
  },
});
