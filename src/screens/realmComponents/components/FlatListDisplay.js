import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Easing,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import Colors from '../../../../services/colors';
import {ScreenSize} from '../../../../services/config';
import {deleteTask} from '../db/schema';
import AddModal from './AddModal';

const swipeReleaseActionConfig = {
  toValue: {x: 0, y: 0},
  duration: 250,
  easing: Easing.elastic(0.5),
  useNativeDriver: true,
};

class FlatListDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swipeAction: false,
      toggleSwipe: false,
      taskComplete: false,
      editAction: false,
      openKeyBoard: false,
    };
  }

  DeleteTask = () => {
    Alert.alert(
      'Delete',
      'Delete a Task?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            deleteTask(this.props.id)
              .then()
              .catch((error) => {
                Alert.alert(
                  `Sorry couldnt delete the task ${this.props.id}, error=${error}`,
                );
              });
            this.props.reloadList();
          },
        },
      ],
      {cancelable: true},
    );
  };

  swipeStart = () => {
    this.setState({
      swipeAction: true,
    });
  };

  swipeRelease = () => {
    this.setState({
      swipeAction: false,
    });
  };

  toggleSwipe = () => {
    this.setState({
      toggleSwipe: !this.state.toggleSwipe,
    });
  };

  taskCompleted = () => {
    this.setState({
      taskComplete: !this.state.taskComplete,
    });
  };

  editTask = () => {
    this.setState({
      editAction: !this.state.editAction,
    });
  };

  openKeyBoard = () => {
    this.setState({
      openKeyBoard: !this.state.openKeyBoard,
    });
  };

  render() {
    const swipeLeftContent = (
      <View
        style={[
          styles.leftSwipeItem,
          {
            backgroundColor: this.state.swipeAction
              ? Colors.pureLightBlue
              : Colors.turkishSea,
          },
        ]}>
        {this.state.swipeAction ? (
          <View style={styles.swipeContents}>
            <Text style={[styles.SubTitle, styles.leftTxtItem]}>release!</Text>
            <FontAwesome
              name="long-arrow-right"
              size={24}
              color={Colors.White}
            />
          </View>
        ) : (
          <View style={styles.swipeContents}>
            <Text style={[styles.SubTitle, styles.leftTxtItem]}>
              Task Completed!
            </Text>
            <Feather
              name="check-circle"
              size={16}
              color={Colors.White}
              style={styles.iconComplete}
            />
          </View>
        )}
      </View>
    );

    const swipeRightContent = (
      <View
        style={[
          styles.rightSwipeItem,
          {
            backgroundColor: this.state.swipeAction
              ? Colors.cherryTomato
              : Colors.golden,
          },
        ]}>
        {this.state.swipeAction ? (
          <View style={styles.swipeContents}>
            <Text style={[styles.SubTitle, styles.rightTxtItem]}>release!</Text>
            <FontAwesome
              name="long-arrow-left"
              size={24}
              color={Colors.White}
            />
          </View>
        ) : (
          <View style={styles.swipeContents}>
            <Text style={[styles.SubTitle, styles.rightTxtItem]}>
              Delete Task!
            </Text>
            <FontAwesome name="trash-o" size={24} color={Colors.White} />
          </View>
        )}
      </View>
    );

    return (
      <Swipeable
        style={styles.container}
        leftActionActivationDistance={180}
        leftContent={swipeLeftContent}
        onLeftActionActivate={() => {
          this.swipeStart();
        }}
        onLeftActionDeactivate={() => {
          this.swipeRelease();
        }}
        onLeftActionComplete={() => {
          this.toggleSwipe();
          this.taskCompleted();
        }}
        rightContent={swipeRightContent}
        rightActionActivationDistance={180}
        onRightActionActivate={() => {
          this.swipeStart();
        }}
        onRightActionDeactivate={() => {
          this.swipeRelease();
        }}
        onRightActionComplete={() => {
          this.toggleSwipe();
          this.DeleteTask();
        }}
        swipeReleaseAnimationConfig={swipeReleaseActionConfig}>
        <View style={styles.listItem}>
          {this.state.taskComplete ? (
            <View style={styles.swipeContents}>
              <Feather
                name="check-circle"
                size={16}
                color={Colors.black}
                style={styles.iconComplete}
              />
              <View style={[styles.taskList, styles.taskContainer]}>
                <Text style={[styles.Title, styles.completedTask]}>
                  {this.props.name}
                </Text>
                <Text style={[styles.SubTitle, styles.completedTask]}>
                  {this.props.creationDate.toLocaleString()}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.swipeContents}>
              <Ionicons
                name="radio-button-off-outline"
                size={16}
                color={Colors.black}
                style={styles.iconComplete}
              />
              <View style={styles.taskList}>
                <Modal
                  isVisible={this.state.editAction}
                  animationIn="bounceInUp"
                  animationOut="slideOutDown"
                  animationInTiming={500}
                  animationOutTiming={500}
                  useNativeDriver={true}
                  hideModalContentWhileAnimating={true}
                  style={{backgroundColor: 'white'}}>
                  <AddModal
                    editAction={() => {
                      this.editTask();
                    }}
                    itemID={this.props.id}
                    taskName={this.props.name}
                    openKeyBoard={() => {
                      this.openKeyBoard();
                    }}
                    reloadList={() => {
                      this.props.reloadList();
                    }}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.taskContainer}
                  onPress={() => {
                    this.editTask();
                  }}>
                  <Text style={styles.Title}>{this.props.name}</Text>
                  <Text style={styles.SubTitle}>
                    {this.props.creationDate.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Swipeable>
    );
  }
}

export default FlatListDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  Delete: {
    backgroundColor: Colors.cherryTomato,
  },
  Title: {
    marginLeft: 20,
    marginTop: 5,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.pureWhite,
  },
  SubTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.pureWhite,
  },
  taskList: {
    borderColor: Colors.black,
    paddingBottom: 5,
    borderBottomWidth: 2,
    width: 300,
    elevation: 1,
  },
  taskContainer: {
    backgroundColor: Colors.pureLightBlue,
    height: 54,
    shadowColor: Colors.black,
    shadowOpacity: 1,
    elevation: 5,
  },
  completedTask: {
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  rightTxtItem: {
    paddingTop: 3,
    paddingRight: 20,
    color: Colors.White,
  },
  leftTxtItem: {
    paddingTop: 3,
    paddingRight: 20,
    color: Colors.White,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  swipeContents: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  iconComplete: {
    paddingTop: 3,
    paddingRight: 5,
  },
  listItem: {
    height: 50,
    paddingLeft: 20,
    justifyContent: 'center',
  },
});
