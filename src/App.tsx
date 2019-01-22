import { Font  } from 'expo';
import { Container, Content, Header } from 'native-base';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {
  VancomycinEmpiricDosing
} from './components/calculators/VancomycinEmpiricDosing/VancomycinEmpiricDosing';

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
    });

    this.setState(Object.assign(this.state, { isReady: true }));
  }

  public render() {
    if (!this.state.isReady) {
      return <Container></Container>;
    }

    return (
      <Container>
        <Header />
        <Content>
            <VancomycinEmpiricDosing/>
        </Content>
      </Container>
    );
  }
}
