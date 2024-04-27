import { useMemo } from 'react';

const useBirthdayFormatter = () => {
  const formattedBirthday = (birthDay, birthYear) => {
    if (!birthDay) return null;

    const [month, day] = birthDay.split('-');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const suffixes = ['st', 'nd', 'rd'];
    const daySuffix = (day > 10 && day < 20) ? 'th' : suffixes[day % 10 - 1] || 'th';

    let reformattedBirthday = `${parseInt(day)}${daySuffix} ${months[parseInt(month) - 1]}`

    if(birthYear){
      reformattedBirthday += `, ${birthYear}`
    }

    return reformattedBirthday;
  }

  return formattedBirthday;
};

export default useBirthdayFormatter;
