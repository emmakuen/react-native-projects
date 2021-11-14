import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {handleButtonClick} = this.props;
    return (
      <Pressable style={styles.button} onPress={handleButtonClick}>
        <Icon name="caret-forward-outline" size={30} color="#fff" />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#536f66',
    borderWidth: 1,
    borderColor: '#DDFFF9',
  },
});

export default PlayButton;
