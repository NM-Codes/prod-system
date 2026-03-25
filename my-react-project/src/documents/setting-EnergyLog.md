# Energy Logging 

**Files:** `SettingsContex.jsx` , `setting.jsx`  , `dashboard.jsx` , `worksession.jsx` and `HistoryList.jsx` 
**Goal:** To hide or display Energy Log

---
## Energy Logging:
- I have an energylogging section that if we toggle it on and off, it affects the following sections:
1. The energy level on the timer page is affected and the energy level boxes are hidden and displayed. The tooltip at the bottom of the page is also hidden and displayed.
2. The energy label is removed and displayed on the history page.


## SettingsContext.jsx
- `useState()` with lazy initial.
- energyLogging is a boolean and If a user previously saved a value for energy logging, converts the string "true" or "false" from storage back into a real JavaScript boolean. Otherwise, sets the feature to On by default.
- I used 2 ways to save the energy logging change: set it into `localStorage` and assign it into autoSave.
- After energy Logging changes, the `useEffect` runs.
- Then I props `energyLogging` and `setEnergyLogging` into `SettingContext.Provider`


## setting.jsx
- I imported `energyLogging`, `setEnergyLogging` from `useSettings()` context. 
- It has ture default value.
- In `handlesaveChange` convert it to string and set it to `localStorage` for auto save.

## worksession.jsx
- I used `ueSetting`.
- In session I said if there is `energyLogging` set the default value 3 if there is not set null.
- If energy logging is turn on on the setting page, Shows on the timer UI.
- If energyLogging is on, it checks `energyLevel` not equal to undefined. The user has to click on one emoji to enable the Start button. If energyLogging is off, it simply returns `true`. The app ignores the energy requirement, and the Start button becomes enabled.


## HistoryList.jsx
- If energyLogging is on show the label on history page.

