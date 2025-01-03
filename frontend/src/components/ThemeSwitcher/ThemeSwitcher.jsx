import { Switch } from "@nextui-org/react";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useThemeSwitcher();

  return (
    <div>
      <Switch
        isSelected={!isDark}
        onChange={toggleTheme}
        color="success"
        endContent={<MoonIcon />}
        size="lg"
        startContent={<SunIcon />}
      ></Switch>
    </div>
  );
};

export default ThemeSwitcher;
