import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  const onValueChange = ({ target }) => {
    setValue(target.value);
  };

  return [value, onValueChange, setValue];
};

export default useInput;
