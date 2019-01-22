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

export const calculateCreatinineClearance =
    (formState: { gender: string, serumCreatinine: number, age: number }, selectedWeight: number,
    ): number => {
      const { gender, serumCreatinine, age } = formState;

      const genderMultiplier = gender === GenderEnum.MALE ? 1 : 0.85;
      return ((140 - age) * selectedWeight * genderMultiplier) / (serumCreatinine * 72);
    };

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

export const performCalculations = (formState: IFormState) => {
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
      creatinineClearance:creatinineClearance,
      doseInMg: doseInMg,
      doseInterval: doseInterval
    }
  };
};

export enum HeightUnitEnum {
    CM = 'cm',
    IN = 'in',
}
export enum WeightUnitEnum {
    KG = 'kg',
    LB = 'lb',
}

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
}

export enum CalculatedWeightsEnum {
    ADJUSTEDWEIGHT = 'Adjusted Weight',
    IDEALWEIGHT = 'Ideal Weight',
    TOTALWEIGHTINKG = 'Total Weight',
}

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
