// /src/components/.../AuthSection.jsx
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import ButtonB from "@/components/common/buttons/ButtonB";
import ButtonA from "@/components/common/buttons/ButtonA";
import UserProfile from "../UserProfile/UserProfile";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const AuthSection = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <>
        <UserProfile />
      </>
    );
  }

  // If user is not logged in, show login/signup buttons
  return (
    <div className="flex items-center gap-2">
      <ButtonA text="Log In" to="/login" />
      <ButtonB text="Join Us" to="/signup" />
    </div>
  );
};

export default AuthSection;
