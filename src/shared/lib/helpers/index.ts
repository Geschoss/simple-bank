export const array = {
  range: (size: number) => Array.from({ length: size }, (_, i) => i),
  make: <U>(mapfn: (v: any, k: number) => U, length: number) =>
    Array.from({ length }, mapfn),
};

export const random = {
  int: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  float: (min, max, decimals) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  },
};

export const string = {
  padLeft: (str: string | number, length: number) =>
    ('000000' + str).slice(-length),
};

export const date = {
  format: (date: Date) =>
    `${date.getFullYear()}.${string.padLeft(
      date.getMonth() + 1,
      2
    )}.${string.padLeft(date.getDay() + 1, 2)} ${string.padLeft(
      date.getHours(),
      2
    )}:${string.padLeft(date.getMinutes(), 2)}`,
};
