import { Font, Constants  } from 'expo';
import { Container, Content, Header } from 'native-base';
import * as React from 'react';
import HomeScreen from './pages/home/index';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight,
  },
  mainView: {
    flex: 1
  }
  // rest of the styles
});

export default class App extends React.Component <any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  public async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf')
    });

    this.setState(Object.assign(this.state, { isReady: true }));
  }

  public render() {
    if (!this.state.isReady) {
      return <Container></Container>;
    }

    return (
      <View style={styles.mainView}>
        <View style={styles.statusBar} />
      <HomeScreen/>
      </View>
    );
  }
}
