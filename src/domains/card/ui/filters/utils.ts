export const updateState = (values: any[], id: any) => {
  let state;
  if (values.includes(id)) {
    state = values.filter((value) => value !== id);
  } else {
    state = [...values, id];
  }
  return state;
};
export const initValues =
  (key: string, searchParams: URLSearchParams) => () => {
    const values = searchParams.get(key);
    if (values) {
      return values.split(',');
    }
    return [];
  };
