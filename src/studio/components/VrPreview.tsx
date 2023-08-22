import React, { useCallback, useState } from 'react';
import type { StringInputProps } from 'sanity';
import { Stack, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';

const VrPreview: React.FC<StringInputProps> = ({ elementProps, onChange }) => {
  const [vrUrl, setVrUrl] = useState(elementProps.value);

  const handleVrUrlChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      setVrUrl(nextValue);
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );

  return (
    <Stack space={2}>
      {!!vrUrl && (
        <iframe
          className="aspect-video w-full rounded"
          src={vrUrl}
          title="preview"
        />
      )}

      <TextInput {...elementProps} onChange={handleVrUrlChange} />
    </Stack>
  );
};

export default VrPreview;
