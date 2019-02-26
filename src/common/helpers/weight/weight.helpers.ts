import { HeightUnitEnum, GenderEnum } from '../../common.enums';

export const calculateWeight = (formData: ICalculateWeightProp): ICalculatedWeights => {
  const { weightUnit, weight, heightUnit, height, gender } = formData;
  let adjustedWeight = 0;
  let idealWeight = 0;

  const totalWeightInKG = weightUnit === WeightUnitEnum.KG ? weight : (weight / 2.2);
  const heightInInches = heightUnit === HeightUnitEnum.IN ? height : (height / 2.54);
  const heightOverFiveFeet = heightInInches - 60;
  const weightAdjustment = (heightOverFiveFeet > 0) ? (heightOverFiveFeet * 2.3) : 0;
  const idealWeightAdjustment = gender === 'male' ? 50 : 45.5;

  idealWeight = idealWeightAdjustment + weightAdjustment;
  adjustedWeight = idealWeight + 0.4 * (totalWeightInKG - idealWeight);
  const percentageAdjustedIdealWeight = (adjustedWeight * 100) / idealWeight;

  return {
    adjustedWeight,
    idealWeight,
    totalWeightInKG,
    percentageAdjustedIdealWeight,
  };
};

export const selectWeightToUse = (calculatedWeights: ICalculatedWeights): ISelectedWeight => {
  const { adjustedWeight, idealWeight, totalWeightInKG } = calculatedWeights;
  if (totalWeightInKG < idealWeight) {
    return {
      selectedWeightName: CalculatedWeightsEnum.TOTALWEIGHTINKG,
      selectedWeightValue: totalWeightInKG,
    };
  } if (adjustedWeight >= (idealWeight * 1.25)) {
    return {
      selectedWeightName: CalculatedWeightsEnum.ADJUSTEDWEIGHT,
      selectedWeightValue: adjustedWeight,
    };
  }
  return {
    selectedWeightName: CalculatedWeightsEnum.IDEALWEIGHT,
    selectedWeightValue: idealWeight,
  };
};

export interface ISelectedWeight {
  selectedWeightName: CalculatedWeightsEnum;
  selectedWeightValue: number;
}

export interface ICalculatedWeights {
  adjustedWeight: number;
  idealWeight: number;
  totalWeightInKG: number;
  percentageAdjustedIdealWeight: number;
}

export interface ICalculateWeightProp {
  weightUnit: WeightUnitEnum;
  weight: number;
  heightUnit: HeightUnitEnum;
  height: number;
  gender: GenderEnum;
}

export enum CalculatedWeightsEnum {
  ADJUSTEDWEIGHT = 'Adjusted Weight',
  IDEALWEIGHT = 'Ideal Weight',
  TOTALWEIGHTINKG = 'Total Weight',
}

export enum WeightUnitEnum {
  KG = 'kg',
  LB = 'lb',
}
