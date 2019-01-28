import * as React from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
const routes = ['Home', 'Chat', 'Profile'];
export default class SideBar extends React.Component<any, any> {
  public render() {
    return (
      <Container>
        <Content>
          {/* <Image
            source={{
              uri: ''
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: ''
              }}
            />
          </Image> */}
          <List
            dataArray={routes}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
