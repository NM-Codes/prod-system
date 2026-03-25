# Daily Goal

**Files:** `SettingsContex.jsx` , `setting.jsx`  and `dashboard.jsx`  
**Goal:** Have a daily goal and know how much percent of goal meet today.

---
## Daily Goal:
- I have a daily goal with a default value (240) minutes. If I change it and save change, and go to the dashboard page, we can see what percentage of the goal we have achieved today.


## setting.jsx
- I used useSettings in my page. 
- And I set it in my UI.
- I used `formatGoalHit` for convert minutes to hour.


## dashboard.jsx 
- `minutes`: total minutes that user worked today 
- `goal`: calculates daily goal
- `progress`: percentage of today’s session to daily goal. 
- `useMemo`: to recalculate the percentage if the user adds a new session or changes their goal in Settings.
- today's total work time:  in useMemo and it is shown in dashboard.
- `avgEnergy`:  in useMemo and it is shown in dashboard.
- `weeklySession`:  in my useMemo and updated it in the dashboard.
