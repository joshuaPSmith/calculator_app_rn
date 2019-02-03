import * as React from 'react';
import AppHeader from '../../components/header/AppHeader';
import {
  Container,
  Button,
  Content,
  Text } from 'native-base';

export default class HomeScreen extends React.Component<any, any> {
  public render() {
    return (
      <Container>
        <AppHeader title="Home"/>
        <Content padder>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('VancomycinEmpiricDosing')}>
            <Text>Vancomycin Empiric Dosing</Text>
          </Button>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('CreatineClearance')}>
            <Text>Creatine Clearance</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
