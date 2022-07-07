export const convertJiraTimeToSec = (s: string): number => {
  let result = 0; // sec
  const tabs = s.split(' ');
  tabs.forEach((item) => {
    const t = item.match(/(\d{1,2})([msdh])/);
    console.log(t);
    if (t && t.length === 3) {
      switch (t[2]) {
        case 's': result += Number(t[1]); break;
        case 'm': result += Number(t[1]) * 60; break;
        case 'h': result += Number(t[1]) * 60 * 60; break;
        case 'd': result += Number(t[1]) * 60 * 60 * 24; break;
      }
    }
  })
  return result;
}
