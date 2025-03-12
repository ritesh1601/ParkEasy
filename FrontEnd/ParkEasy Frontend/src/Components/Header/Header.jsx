import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  LogIn,
  LogOut,
  Menu,
  ParkingCircle,
  Search,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <ParkingCircle className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold">ParkEasy</span>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative max-w-md w-full mx-4"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for parking locations..."
            className="pl-9 pr-4 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <Button variant="outline" size="sm" onClick={onToggleUserType}>
              {userType === "driver" ? "Driver" : "Owner"}
            </Button>
          )}
          {!isLoggedIn ? (
            <Button onClick={onLogin}>
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Car className="mr-2 h-4 w-4" /> My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <ParkingCircle className="h-6 w-6 text-primary mr-2" />
                ParkEasy
              </SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for parking..."
                  className="pl-9 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              {isLoggedIn && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">You are a:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant={userType === "driver" ? "default" : "outline"} size="sm" onClick={onToggleUserType}>
                      Driver
                    </Button>
                    <Button variant={userType === "owner" ? "default" : "outline"} size="sm" onClick={onToggleUserType}>
                      Owner
                    </Button>
                  </div>
                </div>
              )}
              {!isLoggedIn ? (
                <Button className="w-full" onClick={onLogin}>
                  <LogIn className="h-4 w-4" /> Sign In
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={onLogout}>
                  <LogOut className="h-4 w-4" /> Log Out
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;