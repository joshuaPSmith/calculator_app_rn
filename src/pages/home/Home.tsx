import * as React from 'react';
import AppHeader from '../../components/header/AppHeader';
import {
  Container,
  Button,
  Content,
  Text,
  Input,
  Item,
  Label
} from 'native-base';

export default class HomeScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      calculators: [
        {
          name: 'Vancomycin Empiric Dosing',
          url: 'VancomycinEmpiricDosing'
        },
        {
          name: 'Creatine Clearance',
          url: 'CreatineClearance'
        }
      ],
      searchString: ''
    };
  }

  public render() {
    return (
      <Container>
        <AppHeader title="Home" />
        <Item rounded>
        <Label>Search: </Label>
        <Input
          value={this.state.searchString}
          onChangeText={this.handleSearchChange}
        />
        </Item>
        <Content padder>
          {this.calculatorList()}
        </Content>
      </Container>
    );
  }

  private handleSearchChange = (searchString: string) => {
    this.setState({
      ...this.state,
      searchString: searchString
    });
  }
  private calculatorList = () => {
    return this.state.calculators.map((calculator, i) => {
      if (calculator.name.toLowerCase().includes(this.state.searchString.toLowerCase())) {
        return (
          <Button full rounded dark
            style={{ marginTop: 10 }}
            key={i}
            onPress={() => this.props.navigation.navigate(calculator.url)}>
            <Text>{calculator.name}</Text>
          </Button>
        );
      }
    });
  }
}
