import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../Login";
import Signup from "../Signup";
import { UrlState } from "@/Context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  
  const longLink = searchParams.get("createNew");
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const redirectPath = `/dashboard${longLink ? `?createNew=${longLink}` : ""}`;
      navigate(redirectPath);
    }
  }, [isAuthenticated, loading, navigate, longLink]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          {longLink ? "Hold up! Let's login first..." : "Welcome Back"}
        </h1>
        {!longLink && (
          <p className="mt-3 text-lg">
            Sign in to your account or create a new one
          </p>
        )}
      </header>

      <div className="w-full max-w-md shadow-sm rounded-lg p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-2">
            <Login />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-2">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;