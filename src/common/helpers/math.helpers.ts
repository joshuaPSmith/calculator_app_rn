/**
 * @param n
 * @param digits
 *
 * This is my attempt to work on rounding errors. I found it here:
 * https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding/32605063#32605063
 */

export const roundTo = (n: number, digits: number): number => {
  const multiplicator = Math.pow(10, digits);
  const toFixedN = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(toFixedN) / multiplicator;
};
