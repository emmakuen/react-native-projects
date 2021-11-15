import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import colors from '../themes/Colors';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
class List extends React.PureComponent {
  render() {
    const {title, content, navigation} = this.props;
    return (
      <View style={styles.listContainer}>
        {content.length > 0 ? (
          <View>
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
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingLeft: 10,
    color: colors.titleColor,
  },
});

List.propTypes = propTypes;
export default List;
