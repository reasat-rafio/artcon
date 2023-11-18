import type { StringInputProps } from 'sanity';
import { Stack, TextInput } from '@sanity/ui';
import YouTubePlayer from 'react-player/youtube';
import React, { useCallback, useState } from 'react';
import { set, unset } from 'sanity';

export default function YouTubeInput(props: StringInputProps) {
  const { elementProps, onChange } = props;
  const [ytUrl, setYtUrl] = useState(elementProps.value);

  const handleYtUrlChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      setYtUrl(nextValue);
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );

  return (
    <Stack space={2}>
      {!!ytUrl && (
        <div className="h-full w-full overflow-hidden">
          <YouTubePlayer
            className="aspect-video h-full w-full object-cover"
            url={ytUrl}
          />
        </div>
      )}
      <TextInput {...elementProps} onChange={handleYtUrlChange} />
    </Stack>
  );
}
