/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser } from "../apicalls/authApi";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        //
      } else {
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
