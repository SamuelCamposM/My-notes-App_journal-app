export const timeDiff = (date = Date.now()) => {
  return new Date(date - new Date().getTimezoneOffset() * 60 * 1000)
    .toString()
    .substring(0, 24);
};
