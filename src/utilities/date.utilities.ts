const getMonthDateTime = (date: Date) => {
  const options: any = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('en-IN', options);
};

export const getDateFormat = (dateString: string, format: string) => {
  const date = new Date(dateString);
  let resultString = '';

  switch (format) {
    case 'MMM DD, LT':
      resultString = getMonthDateTime(date);
      break;

    default:
      break;
  }

  return resultString;
};
