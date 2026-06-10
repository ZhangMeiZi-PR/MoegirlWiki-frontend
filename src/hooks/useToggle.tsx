import useLocalStorage from "./useLocalStorage";

const useToggle = (key: string, initValue: unknown) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value: unknown) => {
    setValue((prev: unknown) => {
      return typeof value === 'boolean' ? value : !prev;
    })
  };

  return [value, toggle]
}

export default useToggle;