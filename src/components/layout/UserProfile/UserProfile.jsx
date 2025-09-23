import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ButtonB from "@/components/common/buttons/ButtonB";
import ButtonA from "@/components/common/buttons/ButtonA";

import ProfileButton from './ProfileButton';
import ProfileDropdown from './ProfileDropDown';
import AccountModal from './AccountModal';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const modalRef = useRef(null);
  const accountModalRef = useRef(null);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success || result.success === undefined) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
    setShowModal(false);
  };

  const handleManageAccount = () => {
    setShowModal(false);
    setShowAccountModal(true);
  };

  const onProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
      if (accountModalRef.current && !accountModalRef.current.contains(event.target)) {
        setShowAccountModal(false);
      }
    };

    if (showModal || showAccountModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, showAccountModal]);

  if (user) {
    return (
      <>
        <div className="relative">
          <ProfileButton 
            user={user}
            onClick={() => setShowModal(!showModal)}
          />
          
          <ProfileDropdown
            ref={modalRef}
            user={user}
            isVisible={showModal}
            onManageAccount={handleManageAccount}
            onLogout={handleLogout}
          />
        </div>

        <AccountModal
          ref={accountModalRef}
          isVisible={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          user={user}
          onProfilePicUpload={onProfilePicUpload}
        />
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <ButtonA text="Log In" to="/login" />
      <ButtonB text="Join Us" to="/signup" />
    </div>
  );
};

export default UserProfile;