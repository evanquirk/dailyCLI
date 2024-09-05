import { format, addDays, subDays } from 'date-fns';

export function createDailyNoteContent(date) {
  const yesterday = subDays(date, 1);
  const tomorrow = addDays(date, 1);
  
  const template = `---
created: ${format(date, "yyyy-MM-dd'T'HH:mm:ssxxx")}
modified: ${format(date, "EEEE do MMMM yyyy HH:mm:ss")}
date: "${format(date, "EEEE, MMM do yyyy")}"
tags: 
cssclasses:
  - daily
  - ${format(date, 'EEEE').toLowerCase()}
template: "[[04 Archives/04.04 Templates/Daily|Daily]]"
weather: 
high: 
low: 
uvIndex: 
avPm10: 
avPm25: 
avCO: 
avNO2: 
avEuAqi: 
avUsAqi: 
sunrise: 
sunset: 
moonPhase: 
wake: 
sleep: 
morning: 
moodAM: 
workout: 
tasks: 
moodPM: 
night: 
meditationNote: 
reading: 
readingTime: 
breakfast: 
lunch: 
dinner: 
snack: 
water: 
weight: 
BMs: 
aliases:
  - ${format(date, 'yyyy-MM-dd')}
---
## ${format(date, 'EEEE MMMM dd yyyy')}
> [!important]- ❮❮ [[05 Periodic Notes/05.02 Daily/${format(yesterday, 'yyyy/MM/yyyy-MM-dd')}|${format(yesterday, 'yyyy-MM-dd EEE')}]] | [[06 Quick Note|✍️]] | [[05 Periodic Notes/05.02 Daily/${format(tomorrow, 'yyyy/MM/yyyy-MM-dd')}|${format(tomorrow, 'yyyy-MM-dd EEE')}]] ❯❯
> [[05 Periodic Notes/05.06 Yearly/${format(date, 'yyyy')}|${format(date, 'yyyy')}]] / [[05 Periodic Notes/05.05 Quarterly/${format(date, 'yyyy-[Q]Q')}|${format(date, '[Q]Q')}]] / [[05 Periodic Notes/05.04 Monthly/${format(date, 'yyyy/yyyy-MM')}|${format(date, 'MMMM')}]] / [[05 Periodic Notes/05.03 Weekly/${format(date, "RRRR-'W'II")}|Week ${format(date, 'w')}]] / ${format(date, 'dd')}

`;

  return template;
}