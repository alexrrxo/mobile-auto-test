export const timeConverter = (timeStamp: string) => {
  const date = new Date(timeStamp);

  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const year = date.getFullYear();

  return [day, month, year].join('.') + ' / ' + [hours, minutes].join(':');
};
