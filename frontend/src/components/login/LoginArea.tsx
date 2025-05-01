import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
 

export default function LoginArea() {
  const { user, isAuthenticated, isLoading } = useAuth0();
 
  useEffect(() => {
    if (user && user.picture) {
      console.log("User picture URL:", user.picture);
     
    }
  }, [user]);
  
  if (isLoading) return <div>Loading...</div>;
  
  if (isAuthenticated && user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="border-1 border-purple-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {user.picture ? (
              <Avatar>
                <AvatarImage 
                  src={user.picture} 
                  alt={user.name || "User profile"}
                  className="h-10 w-10 "
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    (e.target as any).style.display = "none";
                  }}
                />
                <AvatarFallback>
                  <User className="h-6 w-6  " />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>
                  <User className="h-6 w-6 " />
                </AvatarFallback>
              </Avatar>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">User Profile</h3>
            <div className="grid gap-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Name</p>
                <p className="text-sm">{user.name || "User Name"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="text-sm">{user.email || "No email available"}</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  
  return <LoginButton />;
}