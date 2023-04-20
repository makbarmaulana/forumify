// convert vote count to string.
// ex: 1000 to 1k, 10.000 to 10K, 1.000.000 to 1M.

const intToString = (number) => {
  const units = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  let value = number;
  let index = 0;

  while (value >= 1000) {
    value /= 1000;
    index += 1;
  }

  return (
    value.toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + units[index]
  );
};

export default intToString;
