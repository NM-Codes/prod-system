# Data Management

**Files:** `SettingsContex.jsx` , `setting.jsx`  ,  and `worksession.jsx` 
**Goal:** To manage data and import and export data from App

---
## Data Management:
- In the setting page we have a data Management that when we click on the Exportera Energyloggar, we can download a json file including date, start and end time of session, title, duration of session, category and session type. 



## WorkSession.jsx
- In the WorkSession page we have a `handleTimerComplete` that calculate duration of sessions.

## settingContext.jsx
The `useSettings` hook acts as the bridge and when `Setting.js` or `WorkSession.js` updates a session, the Context broadcasts that change to the entire app.


## setting.jsx
- Export energyloggar: I used `sessions.filter(s => s.energyLevel !== null && s.energyLevel !== "")` to filter sessions that include the energy level. 
- Download: `new Blob([dataStr])` takes our JavaScript text and wraps it into a "Binary Large Object" (a file). 
- `URL.createObjectURL` creates a temporary link in the browser's memory that points to that file.
- `document.createElement("a")` our code creates a invisible <a> link, clicks it automatically to trigger the download, and then immediately deletes the link to keep it clean.
- I showed the total session counts and session’s that have energy level in the UI of setting page.
