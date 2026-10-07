import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar as FlowbiteNavbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import type { user } from "../interfaces/user";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import logo from '../assets/favicon.png'
export default function Navbar() {
    const {userData,setUser}:{userData:user|null}=useContext(AuthContext)
    const navg =useNavigate()
    function logout(){
        localStorage.removeItem('userToken')
        setUser(null)
        navg('/login')
    }
  return (
    <FlowbiteNavbar>
      <NavbarBrand className="ml-30" href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Route Posts
        </span>
      </NavbarBrand>

      <div className="flex items-center md:order-2  mr-30">
        {userData ? (
          <Dropdown
            className=" border-blue-400 border text-blue-800  p-2 rounded-2xl"
            label={
              <>
                <Avatar img={userData?.photo} rounded />
                {userData?.name}
                <FontAwesomeIcon icon={faBars} className="text-gray-600" />
              </>
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Abdo</span>
            </DropdownHeader>
            <DropdownItem>
              <NavLink to="/">register</NavLink>
            </DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <>
            <NavLink to="/" className="mx-3">
              Register
            </NavLink>
            <NavLink to="/login" className="mx-3">
              Login
            </NavLink>
          </>
        )}
      </div>

      <NavbarToggle />

      {userData && (
        <NavbarCollapse>
          <NavbarLink href="/feed" active>
            Feed
          </NavbarLink>

          <NavbarLink href="/profile">Profile</NavbarLink>

          <NavbarLink href="/services">Notifications</NavbarLink>
        </NavbarCollapse>
      )}
    </FlowbiteNavbar>
  );
}