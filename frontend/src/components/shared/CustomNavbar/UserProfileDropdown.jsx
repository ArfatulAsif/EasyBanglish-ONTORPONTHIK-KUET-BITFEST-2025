import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router";

export default function UserProfileDropdown() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            color="primary"
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <Link to="/dashboard">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.name}</p>
            </Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link to="/dashboard/settings">
              <h1>My Settings</h1>
            </Link>
          </DropdownItem>
          {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          <DropdownItem key="logout" color="danger" onPress={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
