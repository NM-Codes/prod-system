# Button/ Input/ Card 

**Files:** `Button.jsx` and `card.jsx` and `Input.jsx`
**Goal:** three main component that we can use them later in our project.

---
## Button
- To handle multiple roles like save, toggle and …
- Prop Spreading (`...props`) : that allows the button to accept standard HTML attributes like type="submit" or disabled without needing to define them manually.
- base + Variant class system: This means all buttons share btn-base, and specific class. (className={`btn-base ${themeClass}`})
- `{children}`: allows we write whatever we want later.

## Improvement:
I can use useTheme() hook that I created to control dark and light mode in my component.

--
## card
- I used a Card component that is a primary container for our data. Unlike the Button, which receives a prop, the Card uses useTheme(). This ensures that when the user toggles the global theme, every Card in the app updates instantly without being told. (`const {theme} = useTheme();`)
- By using `{children}`, we can drop a Login form, a Timer, or a Chart inside it without changing the Card's code.
- The title is only rendered if provided (`{title && ...}`), preventing empty spacing bugs in the UI.

--

## Input
- It takes a value and an onChange prop.
- It features built-in error handling. If an error prop is present, it applies an inputError CSS class and displays an error message below.
- It includes a dynamic label system that adjusts its contrast based on isDarkMode, ensuring the app remains readable for all users.

## Improvement
- I can use useTheme() to improve my code.

