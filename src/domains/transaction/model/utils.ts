export type RangePayload = { type: 'from' | 'to'; value: string };

export const updateState = (state: string[], value: string) => {
  if (state.includes(value)) {
    return state.filter((v) => v !== value);
  }
  return [...state, value];
};

export const calculateFilters = (
  currencyValues: string[],
  cardIDValues: string[],
  dateValues: string[],
  amountValues: string[]
) => {
  // TODO simplify
  let result = [currencyValues, cardIDValues].reduce(
    (acc, filter) => (filter.length > 0 ? acc + 1 : acc),
    0
  );
  if (dateValues[0] !== '') {
    result++;
  }
  if (dateValues[1] !== '') {
    result++;
  }
  if (amountValues[0] !== '') {
    result++;
  }
  if (amountValues[1] !== '') {
    result++;
  }
  return result;
};

export const makeFilterPayload = (
  currencyValues: string[],
  cardIDValues: string[],
  dateValues: string[],
  amountValues: string[]
) => {
  // TODO simplify
  let filters: Record<string, any> = {};
  if (currencyValues.length > 0) {
    filters.currency = currencyValues;
  }
  if (cardIDValues.length > 0) {
    filters.cardID = cardIDValues.map((value) => parseInt(value, 10));
  }
  if (dateValues[0] !== '' || dateValues[1] !== '') {
    filters.date = dateValues;
  }
  if (amountValues[0] !== '' || amountValues[1] !== '') {
    filters.amount = amountValues;
  }

  return filters;
};

export const updateRange = (
  [from, to]: string[],
  { type, value }: RangePayload
) => {
  if (type === 'from') {
    return [value, to];
  }
  return [from, value];
};
