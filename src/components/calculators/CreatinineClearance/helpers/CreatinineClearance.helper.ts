import {
  WeightUnitEnum,
  ISelectedWeight,
  ICalculateWeightProp,
  ICalculatedWeights,
  calculateWeight,
  selectWeightToUse } from 'common/helpers/weight.helpers';

import { GenderEnum, HeightUnitEnum } from 'common/common.enums';
import { calculateCreatinineClearance } from 'common/helpers/creatinineClearance.helper';

export const returnCreatinineClearance = (formState: any) => {
  const weightCalculationProps: ICalculateWeightProp = {
    weightUnit: formState.weightUnit,
    weight: Number(formState.weight.value),
    heightUnit: formState.heightUnit,
    height: Number(formState.height.value),
    gender: formState.gender,
  };

  const creatinineClearanceProps: { gender: string, serumCreatinine: number, age: number } = {
    gender: formState.gender,
    serumCreatinine: Number(formState.serumCreatinine.value),
    age: Number(formState.age.value),
  };

  const calculatedWeights: ICalculatedWeights = calculateWeight(weightCalculationProps);
  const selectedWeight: ISelectedWeight = selectWeightToUse(calculatedWeights);
  const creatinineClearance: number = calculateCreatinineClearance(
          creatinineClearanceProps, selectedWeight.selectedWeightValue);

  return {
    calculatedWeights: calculatedWeights,
    results: {
      selectedWeight: selectedWeight,
      creatinineClearance: creatinineClearance
    }
  };
};

export interface IFormState {
  height: {
    value: string,
    error: boolean,
  };
  heightUnit: HeightUnitEnum;
  weight: {
    value: string,
    error: boolean,
  };
  weightUnit: WeightUnitEnum;
  age: {
    value: string,
    error: boolean,
  };
  serumCreatinine: {
    value: string,
    error: boolean,
  };
  gender: GenderEnum;
  isFormInvalid: boolean;
}

export interface IResults {
  selectedWeight: ISelectedWeight;
  creatinineClearance: number;
}
