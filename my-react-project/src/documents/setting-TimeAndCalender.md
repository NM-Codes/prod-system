# Time and Calender

**Files:** `SettingsContex.jsx` , `setting.jsx` , `worksession.jsx` , `dashboard.jsx` and `HistoryList.jsx`
**Goal:** toggle between 12 timmars and 24 timmars.

---
## Time Format: : 12hours/24hours
- It has a default value (24hours) and 
- If users toggle between 12hours and 24hours:
1.  In the Timer page: The time format will change.
2. In the dashboard page the time format will change.
3. In the history page, the time format will change.

## SettingsContex.jsx
- In the `settingProvider` function I used lazy Initializer.
- When React first loads my `SettingProvider`, if it finds a saved value (for example "12h"), it uses that. But if the user is visiting for the very first time and nothing is saved, it falls back to the default: "24h".
- `useEffect`: if timeFormat changes the function runs. And I used 2 ways to save time format setting.
- Then I put timeformat and setTimeFormat inside value in `settingContexProvider`.

## setting.jsx
- the default value is 24h.
- I used `seSetting()`.
- When the user clicks "12-timmars" or "24-timmars", I call `setTimeFormat`. Because of my Context setup, this change reflects in my formatDisplay function on other pages.

## worksession.jsx
- I used `const { timeFormat } = useSettings();`
- `formatDisplay`: it gets a time Input as an argument and will check it. If there is not timeInput return –:-- otherwise check if timeFormat is equal to 24h, returns the date in swedish format .
- It checks if the hour is before noon to decide between Förmiddag or Eftermiddag.
- The || 12 ensures that if the hour is 0 in midnight, it displays 12 instead of 0.

## dashboard.jsx 
- I used `const { timeFormat } = useSettings();`  
- `getFormatDateTime`: I get today’s date and assigned it into now. And translate date and time to swedish.
- If timeFormat is 12h, get hour and minute and calcule period and if hour is less than 12 shows ‘FM’ otherwise ‘EM’.
- `hour 24%2` divide hour to 2. If it is 13 shows 1. 
- `hours12 ? hours12` : 12 ensures that if it is midnight (0), it shows 12 instead of 0.
- `datePart.charAt(0).toUpperCase()` : to capitalize the first letter of string(Torsdag)

## HistoryList.jsx
In this part handled to show time based on swedish format
