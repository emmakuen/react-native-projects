import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Card from '../components/Card';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
class List extends React.PureComponent {
  render() {
    const {title, content, navigation} = this.props;
    return (
      <React.Fragment>
        <View style={styles.list}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}
          />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

List.propTypes = propTypes;
export default List;
