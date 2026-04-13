import {Sun, Moon} from 'lucide-react';
import {useTheme} from '../../../context/shared/ThemeContext.tsx';
import {Button} from '../../shared/Button.tsx';

export const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5"/>}
        </Button>
    );
};