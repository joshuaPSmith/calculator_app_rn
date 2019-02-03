import {
  Button,
  Container,
  Content,
  Form,
  H3,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Text
} from 'native-base';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  IFormState,
  returnVancomycinEmpiricDosing,
  IResults
} from './helpers/vancomycinEmpiricDosing.helper';
import { roundTo } from 'common/helpers/math.helpers';
import AppHeader from '../../header/AppHeader';
import {
  ICalculatedWeights,
  WeightUnitEnum,
  CalculatedWeightsEnum } from 'common/helpers/weight.helpers';
import { HeightUnitEnum, GenderEnum } from 'common/common.enums';

interface IComponentState {
  form: IFormState;
  calculations: {
    weights: ICalculatedWeights
  };
  results: IResults;
}

export class VancomycinEmpiricDosing extends React.Component<{}, IComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      form: {
        height: {
          value: '',
          error: false,
        },
        heightUnit: HeightUnitEnum.CM,
        weight: {
          value: '',
          error: false,
        },
        weightUnit: WeightUnitEnum.KG,
        age: {
          value: '',
          error: false,
        },
        serumCreatinine: {
          value: '',
          error: false,
        },
        gender: GenderEnum.MALE,
        isFormInvalid: true,
        severeInfection: true,
      },
      calculations: {
        weights: {
          adjustedWeight: 0,
          idealWeight: 0,
          totalWeightInKG: 0,
          percentageAdjustedIdealWeight: 0,
        },
      },
      results: {
        selectedWeight: {
          selectedWeightName: CalculatedWeightsEnum.TOTALWEIGHTINKG,
          selectedWeightValue: 0,
        },
        creatinineClearance: 0,
        doseInMg: 0,
        doseInterval: {
          interval: 0,
          displayMessage: '',
        },
      },
    };
  }

  public handleTextInputChange = async (value: string, formElement: string) => {
    const isValidInput = this.isValidInput(value);
    await this.setState(
      {
        ...this.state,
        form: {
          ...this.state.form,
          [formElement]: {
            value,
            error: !isValidInput,
          },
        },
      },
    );

    await this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        isFormInvalid: this.isFormInvalid({ ...this.state.form }),
      },
    });
  }

  public handleSelectionInputChange = (value: string, formElement: string) => {
    this.setState(
      {
        ...this.state,
        form: {
          ...this.state.form,
          [formElement]: value,
        },
      },
    );
  }

  public handleSubmit = () => {

    const { calculatedWeights, results } = returnVancomycinEmpiricDosing({ ...this.state.form });

    this.setState(
      {
        ...this.state,
        calculations: {
          ...this.state.calculations,
          weights: calculatedWeights,
        },
        results: {
          ...results
        },
      },
    );
  }

  public isValidInput = (value: string) => {
    return /^\d*\.?\d*$/.test(value);
  }

  public isFormInvalid = (formState: any) => {
    const { height, weight, age, serumCreatinine } = formState;
    if (height.error || weight.error || age.error || serumCreatinine.error) {
      return true;
    }
    return false;

  }

  public render() {
    return (
      <Container>
        <AppHeader title="Vancomycin Empiric Dosing"/>
        <Content>
          <Form style={styles.form}>
            <H3>Patient Factors</H3>
            <Item rounded
              error={this.state.form.height.error}>
              <Label>Height in CM</Label>
              <Input
                value={this.state.form.height.value}
                onChangeText={
                  value => this.handleTextInputChange(value, 'height')
                }
                keyboardType="number-pad"
              />
            </Item>
            <Picker
              mode="dropdown"
              iosHeader="Height Unit"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.form.heightUnit}
              onValueChange={
                value => this.handleSelectionInputChange(value, 'heightUnit')
              }
            >
              <Picker.Item label="CM" value={HeightUnitEnum.CM} />
              <Picker.Item label="IN" value={HeightUnitEnum.IN} />
            </Picker>
            <Item floatingLabel
              error={this.state.form.weight.error}>
              <Label>Weight in KG</Label>
              <Input
                value={this.state.form.weight.value}
                onChangeText={value => this.handleTextInputChange(value, 'weight')}
                keyboardType="number-pad"
              />
            </Item>
            <Picker
              mode="dropdown"
              iosHeader="Weight Unit"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.form.weightUnit}
              onValueChange={
                value => this.handleSelectionInputChange(value, 'weightUnit')
              }
            >
              <Picker.Item label="KG" value={WeightUnitEnum.KG} />
              <Picker.Item label="LB" value={WeightUnitEnum.LB} />
            </Picker>
            <Item floatingLabel
              error={this.state.form.age.error}>
              <Label>Age in Years</Label>
              <Input
                value={this.state.form.age.value}
                onChangeText={value => this.handleTextInputChange(value, 'age')}
                keyboardType="number-pad"
              />
            </Item>
            <Item floatingLabel
              error={this.state.form.serumCreatinine.error}>
              <Label>SCr in mg/dL (Serum creatinine)</Label>
              <Input
                value={this.state.form.serumCreatinine.value}
                onChangeText={
                  value => this.handleTextInputChange(value, 'serumCreatinine')
                }
                keyboardType="number-pad"
              />
            </Item>

            <Picker
              mode="dropdown"
              iosHeader="Gender"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.form.gender}
              onValueChange={
                value => this.handleSelectionInputChange(value, 'gender')
              }>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
            <Picker
              mode="dropdown"
              iosHeader="Infection Source"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.form.severeInfection}
              onValueChange={
                value => this.handleSelectionInputChange(value, 'severeInfection')
              }>
              <Picker.Item label="Yes" value="true" />
              <Picker.Item label="No" value="false" />
            </Picker>
          </Form>
          <Button
            onPress={this.handleSubmit.bind(this)}
            disabled={this.state.form.isFormInvalid}
            block
          >
            <Text>Submit</Text>
          </Button>
          {this.displayResults()}
        </Content>
      </Container>
    );
  }

  public displayResults = () => {
    // TODO: render results after calculations are finished
    return this.results({ ...this.state.calculations.weights }, { ...this.state.results });
  }

  private results = (weights: any, results: any) => {
    const { totalWeightInKG, adjustedWeight, idealWeight, percentageAdjustedIdealWeight } = weights;
    const { selectedWeight, creatinineClearance, doseInMg, doseInterval } = results;

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between'
        }}>
        <Text>Total Weight: {roundTo(totalWeightInKG, 2)}</Text>
        <Text>Adjusted Weight: {roundTo(adjustedWeight, 2)}</Text>
        <Text>Ideal Weight: {roundTo(idealWeight, 2)}</Text>
        <Text>%AdjBW/IBW: {roundTo(percentageAdjustedIdealWeight, 0)}%</Text>
        <Text>Weight used for calculations: {selectedWeight.selectedWeightName}</Text>
        <Text>Creatinine Clearance: {roundTo(creatinineClearance, 2)}</Text>
        <Text>Dosing: {roundTo(doseInMg, 2)}</Text>
        <Text>Dosing Interval: {doseInterval.interval}</Text>
        <Text> Trough Draw: {doseInterval.displayMessage}</Text>
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
});
