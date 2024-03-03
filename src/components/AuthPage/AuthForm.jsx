/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Input, message } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../apicalls/authApi";
import { setLoader } from "../../store/slices/loaderSlice";
import { setUser } from "../../store/slices/userSlice";

const AuthForm = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProcessing } = useSelector((store) => store.reducer.loader);

  const handleOnFinish = async (values) => {
    dispatch(setLoader(true));
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    dispatch(setLoader(false));
  };

  return (
    <section className="flex justify-center w-full mt-5">
      <div className="px-8 md:px-0 w-[420px]">
        <h1 className="pb-4 text-2xl font-bold text-blue-500 md:text-3xl">
          TradeHub.IO - {isLoginPage ? "Login" : "Register"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {isLoginPage || (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please write your username." },
                { min: 3, message: "Name must have at least 3 characters." },
              ]}
              hasFeedback
            >
              <Input placeholder="name ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Email is not valid." },
              { required: true, message: "Please write your email." },
            ]}
            hasFeedback
          >
            <Input placeholder="email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please write your Password." },
              { min: 5, message: "Password must have at least 5 characters." },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              className="w-full py-2 mx-auto text-white bg-blue-600 rounded-md outline-none"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex justify-center gap-1">
                  <TbFidgetSpinner className="loading-icon" />
                  <span className="text-white">
                    {isLoginPage ? "Logging In..." : "Registering..."}
                  </span>
                </div>
              ) : isLoginPage ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </Form.Item>
          {isLoginPage ? (
            <div className="flex items-center justify-between">
              <p>Don't have account?</p>
              <Link to={"/register"} className="text-blue-600">
                Register Here
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>Already have account?</p>
              <Link to={"/login"} className="text-blue-600">
                LogIn Here
              </Link>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
