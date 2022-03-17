export const formatDate = (date: Date) =>
  `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
