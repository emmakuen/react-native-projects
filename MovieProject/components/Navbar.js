import React from 'react';
import {
  View,
  SafeAreaView,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const logo = require('../assets/images/e_logo.png');

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
          hidden={false}
        />
        {main ? (
          <View style={styles.mainNav}>
            <Image source={logo} style={styles.logo} />
            <Pressable onPress={() => navigation.navigate('Search')}>
              <Icon name="search-outline" size={27} color="#fff" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.mainNav}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={30} color="#fff" />
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
    backgroundColor: '#536f66',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Navbar;
