import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOutIcon } from "lucide-react";
import { UrlState } from "../Context.jsx";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const {user, fetchUser} = UrlState();

  const {loading, fn:fnLogout} = useFetch(logout);
  return (
    <>
    <nav className="py-4 flex justify-between items-center mb-10">
      <Link to="/">
        <img src="/url-shortener-logo.png" className="h-16" alt="Logo" />
      </Link>

      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-0 rounded-full">
            <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic} alt="@shadcn" className="object-contain" />
                <AvatarFallback>MP</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/dashboard"} className="flex">
                <LinkIcon className="mr-2 h-2 w-4" />
                <span>
                    My Links
                </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOutIcon className="mr-2 h-2 w-4" />
                <span onClick={() => {
                  fnLogout().then(() => {
                    fetchUser();
                    navigate("/");
                  })
                  navigate("/auth");
                }}>
                    Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
    {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
