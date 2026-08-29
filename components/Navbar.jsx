"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import profileDefault from "@/assets/images/profile.png";
import { FaBars, FaGoogle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || profileDefault;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 sm:h-18 lg:h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-blue-800 hover:text-white  cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                isMobileMenuOpen
                  ? setIsMobileMenuOpen(false)
                  : setIsMobileMenuOpen(true);
                setIsProfileMenuOpen(false);
              }}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaX className="h-8 w-8" />
              ) : (
                <FaBars className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* Logo + Desktop Menu */}
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProfileMenuOpen(false);
              }}
            >
              <Image
                className="h-8 w-auto sm:h-9 lg:h-10 bg-white rounded"
                src={logo}
                alt="PropertyPulse"
              />
              <span className="hidden sm:block text-white text-lg sm:text-xl lg:text-2xl font-bold ml-2">
                PropertyPulse
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex items-center space-x-1 lg:space-x-2">
                <Link
                  href="/"
                  className={`${pathname === "/" ? "bg-blue-950" : ""} text-white hover:bg-blue-900 rounded-lg px-3 py-2 text-sm lg:text-base font-medium transition-colors`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${pathname === "/properties" ? "bg-blue-950" : ""} text-white hover:bg-blue-900 rounded-lg px-3 py-2 text-sm lg:text-base font-medium transition-colors`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`${pathname === "/properties/add" ? "bg-blue-950" : ""} text-white hover:bg-blue-900 rounded-lg px-3 py-2 text-sm lg:text-base font-medium transition-colors`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Logged Out (Desktop only) */}
          {!session && (
            <div className="hidden lg:block lg:ml-6 flex flex-col gap-5">
              <button
                onClick={() => {
                  signIn();
                  setIsMobileMenuOpen(false);
                  setIsProfileMenuOpen(false);
                }}
                className="flex items-center text-white bg-gray-700 hover:bg-blue-950 rounded-lg px-3 py-2 text-sm lg:text-base font-medium transition-colors cursor-pointer"
              >
                Login or Register
              </button>
            </div>
          )}

          {/* Right Side - Logged In (visible on mobile + desktop) */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 lg:static lg:inset-auto lg:ml-4 lg:pr-0">
              {/* Notifications */}
              <Link
                href="/messages"
                className="relative cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProfileMenuOpen(false);
                }}
              >
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1.5 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors cursor-pointer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session} />
              </Link>

              {/* Profile dropdown */}
              <div className="relative ml-2 sm:ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer transition-colors"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() =>
                    isProfileMenuOpen
                      ? setIsProfileMenuOpen(false)
                      : setIsProfileMenuOpen(true)
                  }
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 lg:h-9 lg:w-9 rounded-full object-cover"
                    src={profileImage}
                    alt="User profile"
                    width={40}
                    height={40}
                  />
                </button>

                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg border border-black focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-400  rounded-lg "
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-400  rounded-lg "
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Saved Properties
                    </Link>
                    <Link
                      href="/sign-out"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  rounded-lg "
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={isMobileMenuOpen ? "block" : "hidden"} id="mobile-menu">
        <div className="lg:hidden space-y-1 px-3 pb-4 pt-2 border-t border-blue-600 flex justify-center gap-5 items-center text-center">
          <Link
            href="/"
            className={`${pathname === "/" ? "bg-blue-950" : ""} text-white block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-blue-900`}
            onClick={() => {
              setIsProfileMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`${pathname === "/properties" ? "bg-blue-950" : ""} text-white block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-blue-900`}
            onClick={() => {
              setIsProfileMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          >
            Properties
          </Link>
          {session && (
            <Link
              href="/properties/add"
              className={`${pathname === "/properties/add" ? "bg-blue-950" : ""} text-white block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-blue-900`}
              onClick={() => {
                setIsProfileMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Add Property
            </Link>
          )}

          {!session && (
            <div className="border-blue-600">
              <button
                onClick={() => {
                  signIn();
                  setIsProfileMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                className="flex text-center items-center text-white bg-blue-900 hover:bg-blue-950 rounded-lg px-3 py-2 text-sm lg:text-base font-medium transition-colors cursor-pointer"
              >
                Login or Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
