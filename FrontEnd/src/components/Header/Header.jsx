import React, { useState } from "react";
import { LogIn, LogOut, Menu, ParkingCircle, Search, User, Car, X } from "lucide-react";

const Header = ({
  isLoggedIn = false,
  userType = "driver",
  userName = "Guest User",
  userAvatar = "",
  onLogin = () => {},
  onLogout = () => {},
  onToggleUserType = () => {},
  onSearch = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <ParkingCircle className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold">ParkEasy</span>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative max-w-md w-full mx-4"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for parking locations..."
            className="pl-9 pr-4 w-full border rounded-md py-2 focus:ring focus:ring-blue-300 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <button
              className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={onToggleUserType}
            >
              {userType === "driver" ? "Driver" : "Owner"}
            </button>
          )}
          {!isLoggedIn ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              onClick={onLogin}
            >
              <LogIn className="h-4 w-4" /> <span>Sign In</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-0 h-8 w-8 rounded-full border bg-gray-200 flex items-center justify-center"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
                ) : (
                  <span className="text-gray-600 font-bold">{userName.charAt(0)}</span>
                )}
              </button>
              
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                    <Car className="mr-2 h-4 w-4" /> My Bookings
                  </button>
                  <hr />
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-5">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-3 right-3 p-2"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 mb-4">
                <ParkingCircle className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">ParkEasy</span>
              </div>
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for parking..."
                  className="pl-9 pr-4 w-full border rounded-md py-2 focus:ring focus:ring-blue-300 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              {isLoggedIn ? (
                <>
                  <p className="text-sm text-gray-500 mb-2">You are a:</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        userType === "driver" ? "bg-blue-600 text-white" : "border"
                      }`}
                      onClick={onToggleUserType}
                    >
                      Driver
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        userType === "owner" ? "bg-blue-600 text-white" : "border"
                      }`}
                      onClick={onToggleUserType}
                    >
                      Owner
                    </button>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    <LogOut className="h-4 w-4 inline-block mr-2" /> Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={onLogin}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  <LogIn className="h-4 w-4 inline-block mr-2" /> Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
