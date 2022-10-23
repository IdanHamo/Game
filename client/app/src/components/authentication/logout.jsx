import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast("You logged out successfully");
    navigate("/");
    window.location.reload();
  });
  return;
};

export default Logout;
