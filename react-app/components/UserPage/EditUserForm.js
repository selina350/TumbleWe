import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUser,
  editUser,
  deleteUser,
} from "../../redux/controller/userSlice";

function EditUserForm({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      setUsername(user.username);
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length > 5) {

      const error = await dispatch(editUser(username, oldPassword, newPassword));
      if (error) {
        console.log(error);
        setErrors(error);
      } else {
        navigate("/");
      }
    } else if (newPassword.length < 6) {
      setErrors({ newPassword: "Password must be 6 characters or more" });
    } else {
      setErrors({
        confirmPassword:
          "Confirm Password must be the same as the new password above",
      });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="login-form-container">
          <div className=" form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <h1>Edit User</h1>
              </div>

              <div className="login-form-input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors?.username && (
                  <div className="error-msg">{errors.username}</div>
                )}
              </div>
              <div className="login-form-input-container">
                <label>Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                {errors?.oldPassword && (
                  <div className="error-msg">{errors.oldPassword}</div>
                )}
              </div>
              <div className="login-form-input-container">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {errors?.newPassword && (
                  <div className="error-msg">{errors.newPassword}</div>
                )}
              </div>
              <div className="login-form-input-container">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors?.confirmPassword && (
                  <div className="error-msg">{errors.confirmPassword}</div>
                )}
              </div>
              <div>
                <button className="signup-login-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserForm;
