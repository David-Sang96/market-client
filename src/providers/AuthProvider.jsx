/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser } from "../apicalls/authApi";
import { setUser } from "../store/slices/userSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        dispatch(setUser(response.userDoc));
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return <section>{children}</section>;
};

export default AuthProvider;
