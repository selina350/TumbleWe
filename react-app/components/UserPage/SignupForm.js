// import React from "react";
// import { Typography, Grid, TextField, Button } from "@mui/material";
// import { Link } from "react-router-dom";

// const SignupForm = () => {
//   return (
//     <Grid container spacing={2} direction={"column"}>
//       <Grid item>
//         <Typography textAlign="center" variant="h4">
//           Sign up
//         </Typography>
//       </Grid>
//       <Grid item container direction={"column"} spacing={1}>
//         <Grid item>
//           <Typography>Email</Typography>
//           <TextField type="email" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item>
//           <Typography>Password</Typography>
//           <TextField type="password" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item>
//           <Typography>Confirm Password</Typography>
//           <TextField type="password" variant="outlined" fullWidth />
//         </Grid>
//       </Grid>
//       <Grid item container direction={"column"} spacing={2}>
//         <Grid item>
//           <Button variant="contained" fullWidth>
//             Sign up
//           </Button>
//         </Grid>
//         <Grid item>
//           <Typography textAlign="center">
//             Already have an account? <Link to="/login">Login</Link>
//           </Typography>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignupForm;


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
  const [errors, setErrors] = useState({});

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
              {errors.length > 0 && (
                <div>
                  <div>
                    {errors.map((error, idx) => (
                      <div className='error-msg' key={idx}>{error}</div>
                    ))}
                  </div>
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
                <button className="cart-button" type="submit">
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
