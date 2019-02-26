import { HeightUnitEnum, GenderEnum } from 'common/common.enums';
import {
  WeightUnitEnum,
  ISelectedWeight,
  ICalculateWeightProp,
  ICalculatedWeights,
  calculateWeight,
  selectWeightToUse } from 'common/helpers/weight/weight.helpers';
import {
  calculateCreatinineClearance
} from 'common/helpers/creatinineClearance/creatinineClearance.helper';

export const calculateDose = (severeInfection: boolean, calculatedWeight: number) => {
  const weightMultiplier = severeInfection ? 15 : 17;

  return ((calculatedWeight * weightMultiplier) + (calculatedWeight * 20)) / 2;
};

export const calculateDoseInterval = (creatinineClearance: number, age: number) => {
  if (creatinineClearance > 80) {
    const interval = age > 40 ? 12 : 8;
    return {
      interval,
      displayMessage: 'Trough level 30 minutes before 4th dose',
    };
  } if (creatinineClearance > 55) {
    return {
      interval: 12,
      displayMessage: 'Trough level 30 minutes before 4th dose',
    };
  } if (creatinineClearance > 20) {
    return {
      interval: 24,
      displayMessage: 'Trough level 30 minutes before 3rd dose',
    };
  }
  return {
    interval: 48,
    displayMessage: 'Random trough level 48 hours after 1st dose',
  };

};

export const returnVancomycinEmpiricDosing = (formState: IFormState) => {
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
  const doseInMg: number = calculateDose(
          formState.severeInfection, selectedWeight.selectedWeightValue);
  const doseInterval: IDoseInterval = calculateDoseInterval(
          creatinineClearance, Number(formState.age.value));

  return {
    calculatedWeights: calculatedWeights,
    results: {
      selectedWeight: selectedWeight,
      creatinineClearance: creatinineClearance,
      doseInMg: doseInMg,
      doseInterval: doseInterval
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
  severeInfection: boolean;
}

export interface IResults {
  selectedWeight: ISelectedWeight;
  creatinineClearance: number;
  doseInMg: number;
  doseInterval: IDoseInterval;
}

export interface IDoseInterval {
  interval: number;
  displayMessage: string;
}
