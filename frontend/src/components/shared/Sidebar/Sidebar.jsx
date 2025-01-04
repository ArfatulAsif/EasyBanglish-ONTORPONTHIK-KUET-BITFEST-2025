import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createContext, useContext, useState } from "react";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../../../contexts/AuthContext";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Link } from "react-router";
import { IoHome } from "react-icons/io5";
import userImage from "../../../assets/images/user.png";
import bangla from "../../../assets/images/bangla.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <aside className="h-screen relative ">
      <nav
        className={`h-full flex flex-col bg-[#18181b] border-r border-default shadow-sm`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* Image */}
          <div className="mx-auto">
            <Avatar
              isBordered={expanded}
              className={`hover:scale-105 overflow-hidden transition-all ${
                expanded ? "w-32 h-32" : "w-0 h-0"
              }`}
              src={bangla}
            />
          </div>

          {/* Sidebar toggle button */}
          <button
            onClick={() => setExpanded((currentState) => !currentState)}
            className="p-1.5 rounded-lg bg-transparent border-1 border-primary-600 hover:bg-primary-600 hover:text-black group"
          >
            {expanded ? (
              <LuChevronFirst className="text-primary-600 group-hover:text-black" />
            ) : (
              <LuChevronLast />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto scrollbar-thin scrollbar-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-default">
            {children}
          </ul>
        </SidebarContext.Provider>

        <Tooltip
          color="primary"
          size="sm"
          content="Home"
          closeDelay={100}
          placement="right"
          showArrow
          isDisabled={expanded}
        >
          <Link to="/">
            <div className="border-t border-default flex p-3 justify-center items-center">
              <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-background group hover:bg-primary-500 hover:text-black text-primary-600`}
              >
                <IoHome />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Home
                </span>
              </li>
            </div>
          </Link>
        </Tooltip>

        <div className="border-t border-default flex p-3 justify-center items-center">
          {/* User avatar */}
          <Avatar src={user?.image || userImage} alt="avatar" />

          <div
            className={`
            flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.name}</h4>
              <span className="text-xs text-gray-400">{user?.email}</span>
            </div>
            <BsThreeDotsVertical
              size={20}
              onClick={() => setDropdownVisible((prev) => !prev)}
              className="cursor-pointer"
            />

            {/* Dropdown */}
            {dropdownVisible && (
              <div className="absolute right-[20px] bottom-[40px] mt-2 w-28 bg-white shadow-lg rounded-md p-2 z-10">
                <button
                  className="flex gap-2 items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={logout}
                >
                  <MdLogout className="text-indigo-500 text-xl" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Tooltip
      color="primary"
      size="sm"
      content={text}
      closeDelay={100}
      placement="right"
      showArrow
      isDisabled={expanded}
    >
      <li
        className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-background group
        ${
          active
            ? "primary-gradient text-indigo-800"
            : "hover:bg-primary-500 hover:text-black text-primary-600"
        }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-primary-900 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
      </li>
    </Tooltip>
  );
}
