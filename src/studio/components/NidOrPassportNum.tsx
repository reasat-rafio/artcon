import React, { useCallback } from 'react';
import { type ObjectInputProps, set, unset } from 'sanity';

const NidOrPassportNum: React.FC<ObjectInputProps> = ({
  onChange,
  value = '',
  elementProps,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        event.currentTarget.value ? set(event.currentTarget.value) : unset()
      ),
    [onChange]
  );

  return <div></div>;
};

export default NidOrPassportNum;
