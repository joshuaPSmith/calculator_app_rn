import {
  ICalculateWeightProp,
  WeightUnitEnum,
  ICalculatedWeights,
  calculateWeight,
  selectWeightToUse,
  CalculatedWeightsEnum} from './weight.helpers';
import { HeightUnitEnum, GenderEnum } from 'common/common.enums';

describe('1', () => {
  test('Test 1 for calculateWeight', () => {
    const testFormProp: ICalculateWeightProp = {
      weightUnit: WeightUnitEnum.KG,
      weight: 96.8,
      heightUnit: HeightUnitEnum.CM,
      height: 187.96,
      gender: GenderEnum.MALE
    };

    const answer: ICalculatedWeights = {
      adjustedWeight: 88.03999999999999,
      idealWeight: 82.19999999999999,
      totalWeightInKG: 96.8,
      percentageAdjustedIdealWeight: 107.10462287104625
    };
    expect(calculateWeight(testFormProp)).toEqual(answer);
  });

  test('Test 1 for selectWeightToUse', () => {
    const testWeightProps: ICalculatedWeights = {
      adjustedWeight: 88.03999999999999,
      idealWeight: 82.19999999999999,
      totalWeightInKG: 107.10462287104625,
      percentageAdjustedIdealWeight: 96.8
    };

    const answer = {
      selectedWeightName: CalculatedWeightsEnum.IDEALWEIGHT,
      selectedWeightValue: testWeightProps.idealWeight,
    };
    expect(selectWeightToUse(testWeightProps)).toEqual(answer);
  });
});
