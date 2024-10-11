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
template: "[[08 System/08.02 Templates/Daily]]"
weather: 
icon:
high: 
low: 
uvIndex: 
risk: 
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
dreams: 
moodAM: 
noteAM: 
weight: 
workout: 
tasks: 
meditationTime: 
meditationNote: 
completed:
gratitude:
moment:
moodPM: 
notePM:
reading: 
readingTime: 
breakfast: 
lunch: 
dinner: 
snack: 
water: 
BMs: 
aliases:
  - ${format(date, 'yyyy-MM-dd')}
---
## ${format(date, 'EEEE MMMM dd yyyy')}`;

  return template;
}