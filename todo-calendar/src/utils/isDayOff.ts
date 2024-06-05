const isDayOff = async (date: Date): Promise<boolean> => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц в формате MM
  const day = date.getDate().toString().padStart(2, '0'); // День в формате DD

  try {
    const response = await fetch(
      `https://isdayoff.ru/${year}${month}${day}?cc=ru`
    );
    if (!response.ok) {
      throw new Error('Error fetching day off data');
    }
    const result = await response.text();
    return result === '1'; // '1' означает, что это нерабочий день
  } catch (error) {
    console.error('Error fetching day off:', error);
    return false;
  }
};

export default isDayOff;
