import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router";
import { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../../contexts/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown";
import { UserIcon } from "../../icons/UserIcon";

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, logout } = useContext(AuthContext);

  const menuItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Settings", link: "/dashboard/settings" },
    // {title: "Activity", link: ""},
    // {title: "Analytics", link: ""},
    // {title: "System", link: ""},
    // {title: "Deployments", link: ""},
    // {title: "My Settings", link: ""},
    // {title: "Team Settings", link: ""},
    // {title: "Help & Feedback", link: ""},
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/">
            <div className="flex gap-1 items-center">
              <Logo />
              <p className="font-bold text-inherit hidden md:block">
                Easy Banglish
              </p>
            </div>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem> */}
        {isAuth && (
          <>
            <NavbarItem>
              <UserProfileDropdown />
            </NavbarItem>
          </>
        )}
        {!isAuth && (
          <NavbarItem>
            <RouterLink to="/auth">
              <Button
                onPress={(event) => event.preventDefault()}
                className="primary-gradient"
                color="primary"
                href="/auth"
                variant="flat"
                endContent={<UserIcon />}
              >
                Login
              </Button>
            </RouterLink>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.title}-${index}`}>
            <RouterLink className="w-full" color={"foreground"} to={item.link}>
              {item.title}
            </RouterLink>
          </NavbarMenuItem>
        ))}
        {isAuth && (
          <NavbarMenuItem>
            <Link onPress={logout} color="danger" className="cursor-pointer">
              Logout
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
