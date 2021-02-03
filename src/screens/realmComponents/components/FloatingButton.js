import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../../../services/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommunityIcon = MaterialCommunityIcons;

export default class FloatingButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOption: false,
    };
  }

  animation = new Animated.Value(0);
  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();

    this.open = !this.open;
  };

  deleteOption = () => {
    this.props.DeleteNotes();
    this.props.refreshList();
    this.deleteDialog();
  };

  deleteDialog = () => {
    this.setState({
      showOption: !this.state.showOption,
    });
  };

  openCloseAddIcon = () => {
    this.props.AddNote();
    this.toggleMenu();
  };

  openCloseDelIcon = () => {
    this.deleteDialog();
    this.toggleMenu();
  };

  render() {
    const addNote = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };
    const DeleteNotes = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };

    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.showOption}
          style={styles.modal}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}>
          <View style={styles.deleteDialog}>
            <Text style={styles.title}>Delete All Notes!</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.buttons, styles.accept]}
                onPress={() => {
                  this.deleteOption();
                }}>
                <Text style={styles.subTitle}>Yes</Text>
                <FontAwesome5
                  name="check-circle"
                  size={24}
                  style={styles.accept}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttons, styles.cancel]}
                onPress={() => {
                  this.deleteDialog();
                }}>
                <Text style={styles.subTitle}>No</Text>
                <CommunityIcon
                  name="block-helper"
                  size={24}
                  style={styles.cancel}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableWithoutFeedback
          onPress={() => {
            this.openCloseDelIcon();
          }}>
          <Animated.View
            style={[styles.button, styles.secondary, DeleteNotes, opacity]}>
            <FontAwesome name="trash-o" size={24} color={Colors.pureWhite} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.openCloseAddIcon();
          }}>
          <Animated.View
            style={[styles.button, styles.secondary, addNote, opacity]}>
            <Icon name="pen-plus" size={24} color={Colors.pureWhite} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.toggleMenu();
          }}>
          <Animated.View style={[styles.button, styles.menu, [rotation]]}>
            <SimpleLineIcons name="note" size={24} color={Colors.pureWhite} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 80,
    right: 60,
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.pureWhite,
    borderRadius: 40,
    marginTop: 255,
    marginBottom: 255,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: Colors.pureLightBlue,
  },
  secondary: {
    width: 48,
    height: 48,
    backgroundColor: Colors.pureLightBlue,
    borderRadius: 48 / 2,
  },
  deleteDialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: -20,
  },
  title: {
    fontSize: 25,
  },
  subTitle: {
    color: Colors.pureWhite,
    fontSize: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    width: 350,
    marginTop: 50,
    justifyContent: 'space-evenly',
  },
  buttons: {
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: Colors.shadowDarkBlue,
  },
  accept: {
    color: Colors.darkTintGreen,
  },
  cancel: {
    color: Colors.cherryTomato,
  },
});
