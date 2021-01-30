import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../../../../services/colors';

class HeaderTextDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tap To Change 😀',
      showKeyboard: false,
    };
  }

  textChanger = (text) => {
    this.setState({
      title: text,
    });
  };

  showKeyboard = () => {
    this.setState({
      showKeyboard: !this.state.showKeyboard,
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.showKeyboard();
          }}>
          <Text style={styles.txtHeader}>{this.state.title}</Text>
        </TouchableOpacity>
        {this.state.showKeyboard ? (
          <TextInput
            style={styles.title_Input}
            placeholder="Whats the title of the Count Down?"
            onChangeText={this.textChanger}
            keyboardType="default"
            returnKeyType="done"
          />
        ) : (
          <TouchableOpacity>
            <Text />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_Input: {
    alignSelf: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  txtHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
  },
});

export default HeaderTextDisplay;
