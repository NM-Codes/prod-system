# Appearance

**Files:** `themeContext.tsx` and `setting.jsx`
**Goal:** toggle between dark and Light mode.

---
## themeContext
- `useState`: lazy initialization.The function inside useState reads from localStorage only once during the initial mount.
- `useEffect`: Every time the user toggles the theme, a useEffect updates localStorage.Global Styling.
- `useMemo`: I wraped our theme, setTheme, and toggleTheme functions in useMemo. React only recreates the Context Object if the theme variable changes. This prevents unnecessary re-renders in deep child components.
- `useTheme()`: I f someone tries to use useTheme() outside of the ThemeProvider, we throw a clear error.

--
## setting.jsx
- I used `useThem()`.
 `const { theme, toggleTheme } = useTheme();`
- toggle theme: function to toggle between theme in UI.
- Whether we are in the Settings page or the Dashboard, the theme remains consistent, even after a page refresh. Because we useTheme context as a global service.

