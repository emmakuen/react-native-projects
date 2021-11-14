import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

export default function CustomModal({
  modalVisible,
  handleButtonClick,
  navigation,
}) {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.customModal}>
        <VideoPlayer
          source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
          onBack={handleButtonClick}
          onEnd={handleButtonClick}
          navigator={navigation}
          fullscreenOrientation="all"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  customModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
