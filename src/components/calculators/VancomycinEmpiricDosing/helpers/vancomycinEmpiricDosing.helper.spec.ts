
import {
    IFormState,
    returnVancomycinEmpiricDosing,
    calculateDose,
    calculateDoseInterval
} from './vancomycinEmpiricDosing.helper';
import { CalculatedWeightsEnum, WeightUnitEnum } from 'common/helpers/weight/weight.helpers';
import { GenderEnum, HeightUnitEnum } from 'common/common.enums';

describe('State 1', () => {
  const testFormState: IFormState = {
    height: {
      value: '187.96',
      error: false,
    },
    heightUnit: HeightUnitEnum.CM,
    weight: {
      value: '96.8',
      error: false,
    },
    weightUnit: WeightUnitEnum.KG,
    age: {
      value: '29',
      error: false,
    },
    serumCreatinine: {
      value: '0.7',
      error: false,
    },
    gender: GenderEnum.MALE,
    isFormInvalid: true,
    severeInfection: false,
  };

  test('test for calculateDose', () => {
    const results = 1438.5;
    expect(calculateDose(testFormState.severeInfection, 82.2)).toEqual(results);
  });

  test('test for calculateDoseInterval', () => {
    const results = {
      interval: 8,
      displayMessage: 'Trough level 30 minutes before 4th dose'
    };
    expect(calculateDoseInterval(181, Number(testFormState.age.value))).toEqual(results);
  });

  test('Test for returnVancomycinEmpiricDosing', () => {
    const results = {
      calculatedWeights: {
        adjustedWeight: 88.03999999999999,
        idealWeight: 82.19999999999999,
        totalWeightInKG: 96.8,
        percentageAdjustedIdealWeight: 107.10462287104625
      },
      results: {
        selectedWeight: {
          selectedWeightName: CalculatedWeightsEnum.IDEALWEIGHT,
          selectedWeightValue: 82.19999999999999,
        },
        creatinineClearance: 181.03571428571428,
        doseInMg: 1438.4999999999998,
        doseInterval: {
          interval: 8,
          displayMessage: 'Trough level 30 minutes before 4th dose'
        }
      }
    };

    expect(returnVancomycinEmpiricDosing({ ...testFormState })).toEqual(results);
  });
});
