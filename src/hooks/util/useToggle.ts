import { useCallback, useState } from 'react';

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((value?: boolean) => {
    if (typeof value === 'boolean') {
      setValue(value);
      return;
    }

    setValue((v) => !v);
  }, []);

  return [value, toggle] as const;
}
