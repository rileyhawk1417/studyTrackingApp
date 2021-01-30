import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import {insertNewTask, updateTask} from '../db/schema';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../../services/colors';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      addNew: true,
      visible: false,
      editTask: true,
    };
  }

  changedTxt = (text) => {
    this.setState({
      name: text,
    });
  };

  acceptTask = () => {
    if (this.state.name == '') {
      Alert.alert('Please dont leave it blank');
      return;
    } else if (this.state.addNew === true) {
      const newTask = {
        id: Math.floor(Date.now() / 1000),
        name: this.state.name,
        creationDate: new Date(),
      };
      insertNewTask(newTask)
        .then()
        .catch((error) => {
          Alert.alert(`Error adding task ${error}`);
        });
      Keyboard.dismiss();
      this.props.refreshList();
      this.props.closeModal();
      console.log(newTask);
    } else {
      Alert.alert('An error occured');
    }
  };

  editTask = () => {
    if (this.state.name == '') {
      Alert.alert('Please dont leave it blank');
      return;
    } else {
      const updatedTask = {
        id: this.props.itemID,
        name: this.state.name,
      };
      updateTask(updatedTask)
        .then()
        .catch((error) => {
          Alert.alert(`Error updating task ${error}`);
        });
      Keyboard.dismiss();
      this.props.reloadList();
      this.props.editAction();
      console.log(updatedTask);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.props.editAction ? (
            <View style={styles.topElements}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  this.props.editAction();
                }}>
                <FontAwesome
                  name="times-circle"
                  size={40}
                  color={Colors.cherryTomato}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.topElements}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  this.props.closeModal();
                }}>
                <FontAwesome
                  name="times-circle"
                  size={40}
                  color={Colors.cherryTomato}
                />
              </TouchableOpacity>
            </View>
          )}
          {this.props.editAction ? (
            <View style={styles.titleView}>
              <Text style={styles.Title}>Edit a task</Text>
              <FontAwesome name="pencil" size={24} color="#000" />
            </View>
          ) : (
            <View style={styles.titleView}>
              <Text style={styles.Title}>Create a task</Text>
              <MaterialIcons name="add-task" size={24} color={Colors.black} />
            </View>
          )}
        </View>
        {this.props.editAction ? (
          <View>
            <TextInput
              style={styles.txtBox}
              placeholder={this.props.taskName}
              value={this.state.name}
              onChangeText={(text) => {
                this.changedTxt(text);
              }}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.editTask();
              }}
            />
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.accept]}
                onPress={() => {
                  this.editTask();
                }}>
                <Text style={styles.SubTitle}>Edit</Text>
                <FontAwesome name="pencil" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.cancel]}
                onPress={() => {
                  this.props.editAction();
                }}>
                <Text style={styles.SubTitle}>Cancel</Text>
                <Entypo name="block" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.txtBox}
              placeholder="Add Task"
              value={this.state.name}
              onChangeText={(text) => {
                this.changedTxt(text);
              }}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.acceptTask();
              }}
            />
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.accept]}
                onPress={() => {
                  this.acceptTask();
                }}>
                <Text style={styles.SubTitle}>Create</Text>
                <MaterialIcons name="note-add" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.cancel]}
                onPress={() => {
                  this.props.closeModal();
                }}>
                <Text style={styles.SubTitle}>Cancel</Text>
                <Entypo name="block" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default AddModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: 120,
    height: 50,
    borderRadius: 40,
  },
  accept: {
    backgroundColor: Colors.lightGreen,
  },
  cancel: {
    backgroundColor: Colors.cherryTomato,
  },
  buttonView: {
    width: 300,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 80,
  },
  topElements: {
    marginBottom: 80,
    marginTop: -200,
    flexDirection: 'column',
  },
  Title: {
    fontSize: 30,
  },
  titleView: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtBox: {
    borderBottomWidth: 2,
    width: 325,
    textAlign: 'center',
  },
  SubTitle: {
    fontSize: 18,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginTop: 80,
    marginBottom: 40,
    marginLeft: 220,
  },
});
