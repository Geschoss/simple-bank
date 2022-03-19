export const updateState = (state: string[], value: string) => {
  if (state.includes(value)) {
    return state.filter((v) => v !== value);
  }
  return [...state, value];
};
