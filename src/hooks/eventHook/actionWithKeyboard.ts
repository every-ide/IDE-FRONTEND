import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const useActionWithKeyboard = (
  targetKey: string,
  initialState: boolean = false,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const toggle = (event: KeyboardEvent) => {
      if (event.key === targetKey && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsActive((prevState) => !prevState);
      }
    };
    window.addEventListener('keydown', toggle);

    return () => {
      window.removeEventListener('keydown', toggle);
    };
  }, [targetKey]);

  return [isActive, setIsActive];
};

export default useActionWithKeyboard;
