import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { signUp } from "../../redux/controller/userSlice";



function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.controller.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 5) {
      const data = await dispatch(signUp(
        email,
        username, password
      ));
      if (data) {
        console.log(data)
        setErrors(data);
      }
    } else if (password.length < 6) {
      setErrors({ password: "Password must be 6 characters or more" });
    } else {
      setErrors({ password: "Confirm Password field must be the same as the Password field" });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="login-form-container">
          <div className=" form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <h1>Sign Up</h1>
              </div>

              <div className="login-form-input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors?.email && <div className="error-msg">{errors.email}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  />
                {errors?.username && <div className="error-msg">{errors.username}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors?.password && <div className="error-msg">{errors.password}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="signup-login-button" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
