
// import {
//     WeightUnitEnum,
//     GenderEnum,
//     HeightUnitEnum,
//     calculateWeight,
//     ICalculatedWeights,
//     selectWeightToUse,
//     CalculatedWeightsEnum,
//     ICalculateWeightProp,
//     calculateCreatinineClearance,
//     performCalculations,
//     IFormState
// } from './vancomycinEmpiricDosing.helper';

// describe('State 1', () => {
//   const testFormState: IFormState = {
//     height: {
//       value: '187.96',
//       error: false,
//     },
//     heightUnit: HeightUnitEnum.CM,
//     weight: {
//       value: '96.8',
//       error: false,
//     },
//     weightUnit: WeightUnitEnum.KG,
//     age: {
//       value: '29',
//       error: false,
//     },
//     serumCreatinine: {
//       value: '0.7',
//       error: false,
//     },
//     gender: GenderEnum.MALE,
//     isFormInvalid: true,
//     severeInfection: true,
//   };

//   test('Test for performCalculations', () => {
//     const results = {
//       calculatedWeights: {
//         adjustedWeight: 88.03999999999999,
//         idealWeight: 82.19999999999999,
//         totalWeightInKG: 96.8,
//         percentageAdjustedIdealWeight: 107.10462287104625
//       },
//       results: {
//         selectedWeight: {
//           selectedWeightName: CalculatedWeightsEnum.IDEALWEIGHT,
//           selectedWeightValue: 82.19999999999999,
//         },
//         creatinineClearance: 181.03571428571428,
//         doseInMg: 1438.4999999999998,
//         doseInterval: {
//           interval: 8,
//           displayMessage: 'Trough level 30 minutes before 4th dose'
//         }
//       }
//     };

//     expect(performCalculations({ ...testFormState })).toEqual(results);
//   });

//   test('Test 1 for calculateWeight', () => {
//     const testFormProp: ICalculateWeightProp = {
//       weightUnit: WeightUnitEnum.KG,
//       weight: 96.8,
//       heightUnit: HeightUnitEnum.CM,
//       height: 187.96,
//       gender: GenderEnum.MALE
//     };

//     const answer: ICalculatedWeights = {
//       adjustedWeight: 88.03999999999999,
//       idealWeight: 82.19999999999999,
//       totalWeightInKG: 96.8,
//       percentageAdjustedIdealWeight: 107.10462287104625
//     };
//     expect(calculateWeight(testFormProp)).toEqual(answer);
//   });

//   test('Test 1 for selectWeightToUse', () => {
//     const testWeightProps: ICalculatedWeights = {
//       adjustedWeight: 88.03999999999999,
//       idealWeight: 82.19999999999999,
//       totalWeightInKG: 107.10462287104625,
//       percentageAdjustedIdealWeight: 96.8
//     };

//     const answer = {
//       selectedWeightName: CalculatedWeightsEnum.IDEALWEIGHT,
//       selectedWeightValue: testWeightProps.idealWeight,
//     };
//     expect(selectWeightToUse(testWeightProps)).toEqual(answer);
//   });

//   test('Test 1 for calculateCreatinineClearance', () => {
//     const props = {
//       formData: {
//         gender: GenderEnum.MALE,
//         serumCreatinine: 0.7,
//         age: 29
//       },
//       selectedWeight: 82.19999999999999
//     };

//     const answer = 181.03571428571428;

//     expect(calculateCreatinineClearance(props.formData, props.selectedWeight)).toEqual(answer);
//   });
// });
