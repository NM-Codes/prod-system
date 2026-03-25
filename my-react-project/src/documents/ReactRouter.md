# React Router

**Files:** `navData.jsx` and `Header.js` and `App.jsx`
**Goal:** Implementing a dynamic navigation.

---
## React Router
- I implemented a dynamic navigation with React Router.
- I implemented the BrowserRouter Strategy and wrapped the entire application in <Routes>.
- It caused each page (Timer, Analysis, History) to have its own unique "address" (e.g., /analysis). 

--
## navData.jsx
- In the menuItems array, instead of hardcoding links, I created a Navigation Schema with paths.
- By storing title, icon, and path in one array, we can update the entire app's menu in one place.

--

## Header.js
- I replaced standard <a> with React Router's <NavLink>. NavLink automatically knows if it is "Active." (`className={activePage === item.title ? "active" : ""}`)

--
## App.jsx
- I used useNavigate() in my app.jsx. And wrapped all of my routes inside Routes.
(`const navigate = useNavigate();`)
- navigate("/history") helps the user to move automatically to the history page when the timer finishes.
- This is our 404 Safety Net. If a user types a wrong URL, the app gracefully "falls back" to the Dashboard instead of showing a blank screen. (`<Route path="*" element={<DashboardPage />} />`)


