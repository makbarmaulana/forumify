export const intToString = (num) => {
  const units = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  let value = num;
  let index = 0;

  while (value >= 1000) {
    value /= 1000;
    index++;
  }

  return (
    value.toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + units[index]
  );
};
