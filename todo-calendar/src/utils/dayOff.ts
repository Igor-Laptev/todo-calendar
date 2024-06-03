const isDayOff = (date: Date): boolean => {
  return date.getDay() === 0;
};

export default isDayOff;
