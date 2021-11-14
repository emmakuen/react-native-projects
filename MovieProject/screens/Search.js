import React, {useState} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';

export default function Search() {
  const [text, setText] = useState('');
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Search Movie"
          />
        </View>
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
    padding: 40,
    paddingTop: 60,
  },
});
