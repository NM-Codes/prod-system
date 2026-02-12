import { useTheme } from '../../Contexts/ThemeContext.jsx';
import DarkModeButton from '../../assets/dark-mode-button.webp';
import LightModeButton from '../../assets/light-mode-button.webp';

export default function ThemeToggle(){
    const {theme , toggleTheme} = useTheme();

    return (
        <button onClick = {toggleTheme}>
            <img 
            src = {theme === 'light' ? DarkModeButton : LightModeButton}
            alt= "Toggle Theme"
            width={'30px'}
            />
        </button>
    )
}