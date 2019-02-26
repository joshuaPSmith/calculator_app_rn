import { GenderEnum } from 'common/common.enums';
import { calculateCreatinineClearance } from './creatinineClearance.helper';

describe('Test', () => {
  test('Test 1 for calculateCreatinineClearance', () => {
    const props = {
      formData: {
        gender: GenderEnum.MALE,
        serumCreatinine: 0.7,
        age: 29
      },
      selectedWeight: 82.19999999999999
    };

    const answer = 181.03571428571428;

    expect(calculateCreatinineClearance(props.formData, props.selectedWeight)).toEqual(answer);
  });
});
