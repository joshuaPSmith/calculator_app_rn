import { GenderEnum } from 'common/common.enums';

export const calculateCreatinineClearance =
    (formState: { gender: string, serumCreatinine: number, age: number }, selectedWeight: number,
    ): number => {
      const { gender, serumCreatinine, age } = formState;

      const genderMultiplier = gender === GenderEnum.MALE ? 1 : 0.85;
      return ((140 - age) * selectedWeight * genderMultiplier) / (serumCreatinine * 72);
    };
