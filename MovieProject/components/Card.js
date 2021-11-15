import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {IMAGE_PATH} from '../constants';

const placeholderImg = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Detail', {
            movieId: item.id,
          })
        }>
        <Image
          style={styles.image}
          source={
            item.poster_path
              ? {uri: `${IMAGE_PATH}${item.poster_path}`}
              : placeholderImg
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    height: 200,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10,
  },
});

Card.propTypes = propTypes;
export default Card;
