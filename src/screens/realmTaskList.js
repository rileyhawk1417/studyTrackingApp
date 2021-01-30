import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Modal from 'react-native-modal';
import AddModal from './realmComponents/components/AddModal';
import FlatListDisplay from './realmComponents/components/FlatListDisplay';
import {deleteAllTasks, loadTasks} from './realmComponents/db/schema';
import FloatingButton from './realmComponents/components/FloatingButton';
import Colors from '../../services/colors';
import {ScreenSize} from '../../services/config';

class TasksToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskList: [],
      addTask: false,
      refresh: false,
      swipeAction: false,
      deleteOption: false,
    };

    this.reloadData();
  }
  refreshControl = () => {
    setTimeout(() => {
      this.getData();
      this.setState({refresh: false});
    }, 2000);
  };

  getData = () => {
    this.setState({refresh: true});
    this.reloadData();
  };

  reloadData = () => {
    loadTasks()
      .then((TaskList) => {
        this.setState({TaskList});
      })
      .catch((error) => {
        this.setState({TaskList: []});
      });
    console.log('reloadData');
  };

  openAddTask = () => {
    this.setState({addTask: !this.state.addTask});
  };

  deleteNotes = () => {
    deleteAllTasks()
      .then()
      .catch((error) => {
        Alert.alert(`Cant Delete All Tasks, error ${error}`);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Modal
            isVisible={this.state.addTask}
            style={styles.modal}
            animationIn="bounceInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}>
            <AddModal
              closeModal={() => {
                this.openAddTask();
              }}
              refreshList={() => {
                this.refreshControl();
              }}
            />
          </Modal>
        </View>
        <FlatList
          data={this.state.TaskList}
          renderItem={({item, index}) => (
            <FlatListDisplay
              {...item}
              id={item.id}
              itemIndex={index}
              name={item.name}
              creationDate={item.creationDate.toLocaleString()}
              reloadList={() => {
                this.refreshControl();
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshing={this.state.refresh}
          onRefresh={() => {
            this.refreshControl();
          }}
        />
        <FloatingButton
          DeleteNotes={() => {
            this.deleteNotes();
          }}
          refreshList={() => {
            this.refreshControl();
          }}
          AddNote={() => {
            this.openAddTask();
          }}
        />
      </View>
    );
  }
}

export default TasksToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    height: ScreenSize.HEIGHT,
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.pureWhite,
    borderRadius: 40,
  },
});
