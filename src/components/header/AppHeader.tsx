import * as React from 'react';
import { withNavigation, DrawerActions } from 'react-navigation';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

class AppHeader extends React.Component<{navigation: any, title: string}, any> {
  public render() {
    return (
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(AppHeader);
