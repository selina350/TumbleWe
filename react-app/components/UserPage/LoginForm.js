import React, { useEffect, useState } from "react";
import { login } from "../../redux/controller/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.controller.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (sessionUser.email) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data);
      setErrors(data);
    }
  };
  const handleDemoUserLogIn = (e) => {
    e.preventDefault();

    dispatch(login("demo@aa.io", "password")).catch(async (res) => {
      const data = await res.json();
      console.log(data);
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleSignUp = (e) => {
    navigate("/signup");
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <div className=" form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <h1>Log In</h1>
            </div>
            {errors.length > 0 && (
              <div>
                <h4 className="error-msg">
                  Either email or password was wrong, please try again.
                </h4>
              </div>
            )}
            <div className="login-form-input-container">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-input-container">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="signup-login-button" type="submit">
                Log In
              </button>
            </div>
            <div>
              <button
                className="signup-login-button"
                type="submit"
                onClick={handleDemoUserLogIn}
              >
                Demo User Log In
              </button>
            </div>
            <h3>New to TumbleWe?</h3>
            <div>
              <button
                className="signup-login-button"
                type="submit"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
